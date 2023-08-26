import axios from "axios";
import eplModel from "../../models/football/epl/epl.js";
import AppError from "../../utilities/appError.js";
import { sameGameAggregate } from "./sameGameAggregate.js";

// @route /api/epl
export const getAllTeams = async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => {
    delete queryObj[el];
  });
  try {
    const teams = await eplModel.find(queryObj);
    res
      .status(200)
      .json({ message: "success", length: teams.length, data: teams });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

//@route /api/epl
export const addTeam = async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/standings",
    params: {
      season: "2023",
      league: "135",
    },
    headers: {
      "X-RapidAPI-Key": process.env.XRapidAPIKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const {
      data: { response },
    } = await axios.request(options);
    const listOfTeam = [];
    const teamObject = {
      league: "Serie A",
      leagueID: 135,
      // name: ,
      // teamID: ,
      matches: [],
    };
    const listofTeams = response[0].league.standings[0];
    listofTeams.forEach((team) => {
      if (team && team.team) {
        console.log(team);
        const newTeam = {
          ...teamObject,
          name: team.team.name,
          teamID: team.team.id,
        };
        listOfTeam.push(newTeam);
      }
    });

    const team = await eplModel.create(listOfTeam);
    res.status(201).json({ message: "success", data: listOfTeam });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};
// export const addLeague = async (req, res, next) => {
//   try {
//     const epl = await eplModel.find({ league: "Premier League" });
//     // Loop through each team and update the "leagueID" property
//     for (const team of epl) {
//       team.leagueID = 39; // Set the leagueID to 39
//     }

//     // Save the updated documents
//     const updatedEplTeams = await Promise.all(epl.map((team) => team.save()));

//     res.status(201).json({ message: "success", data: updatedEplTeams });
//   } catch (error) {
//     next(new AppError(error.message, 500));
//   }
// };

// @route /api/soccor/:teamId
// update matches array
export const updateTeamMatch = async (req, res, next) => {
  const updatingObj = req.body;
  const teamId = Number(req.params.teamId);

  try {
    const team = await eplModel.findOne({ teamID: teamId });
    if (!team) {
      return next(new AppError("No team with that id", 404));
    }
    if (team.matches.length === 3) {
      // If the length is 3, remove the first object from the array
      team.matches.shift();
    }
    team.matches.push(updatingObj);
    await team.save();
    res.status(200).json({ message: "success" });
  } catch (err) {
    next(new AppError(err.message, 500));
  }
};

//get all the fixtures
export const getFixture = async (leagueID, next) => {
  // Create a new Date object for the current date
  const today = new Date();

  // Extract the year, month, and day components
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const toDay = String(today.getDate() + 1).padStart(2, "0");

  // Combine the components in the desired format
  const fromDate = year + "-" + month + "-" + day;
  const toDate = year + "-" + month + "-" + toDay;

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
    params: {
      league: leagueID,
      season: "2023",
      from: fromDate,
      to: toDate,
    },
    headers: {
      "X-RapidAPI-Key": process.env.XRapidAPIKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const {
      data: { response },
    } = await axios.request(options);

    return response;
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

//calculate the aggregate of the goal and shortsOnTarget
const calculateEveryAspects = async (next, matchObject) => {
  try {
    //fetch the team collection from the database
    //home team
    const homeTeam = await eplModel.findOne({ name: matchObject.home });
    if (!homeTeam) {
      return next(new AppError(`No team with ${matchObject.home}`, 404));
    }

    //away team
    const awayTeam = await eplModel.findOne({ name: matchObject.away });
    if (!awayTeam) {
      return next(new AppError(`No team with ${matchObject.away}`, 404));
    }

    //fetch also the same game aggregate goal.
    const sameTeamAggregate = await sameGameAggregate(
      matchObject.fixtureId,
      next
    );
    if (!sameTeamAggregate) {
      return next(
        new AppError(`Error in fetching the same team aggregate`, 404)
      );
    }
    //initiate some variables to store value
    let shotsOnTargetHomeSum = 0;
    let goalHomeSum = 0;
    let shotsOnTargetAwaySum = 0;
    let goalAwaySum = 0;

    //loop for hometeam matches to calculate shotOnTargets and totalgoal
    for (const match of homeTeam.matches) {
      shotsOnTargetHomeSum += match.shotsOnTargetHome;
      goalHomeSum += match.goalHome;
    }
    //loop for awayteam matches to calculate shotOnTargets and totalgoal
    for (const match of awayTeam.matches) {
      shotsOnTargetAwaySum += match.shotsOnTargetHome;
      goalAwaySum += match.goalHome;
    }

    //return the aggregrate of goal and shortOnTarget which is divided by 6
    return {
      game: `${matchObject.home} vs ${matchObject.away}`,
      goalAggregate: ((goalHomeSum + goalAwaySum) / 6).toFixed(2),
      shotsOnTargetAggregate: (
        (shotsOnTargetHomeSum + shotsOnTargetAwaySum) /
        6
      ).toFixed(2),
      sameTeamAggregate: sameTeamAggregate.toFixed(2),
    };
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

//to get
export const calculatePrediction = async (req, res, next) => {
  const leagueId = req.params.leagueId;
  try {
    //get all the fixtures of the days
    const listOfFixtures = await getFixture(leagueId, next);

    if (listOfFixtures.length === 0) {
      return next(
        new AppError(
          `Sorry: No fixtures available for today in league ${leagueId}.`,
          404
        )
      );
    }
    // Create a new array to store the modified objects with "home" and "away" properties
    const modifiedMatches = [];

    // Iterate through each object in the JSON response
    for (const match of listOfFixtures) {
      // Extract the home and away team names
      const homeTeamName = match.teams.home.name;
      const awayTeamName = match.teams.away.name;
      const fixtureId = match.fixture.id;
      // Create a new object with "home" and "away" properties
      const modifiedMatch = {
        home: homeTeamName,
        away: awayTeamName,
        fixtureId,
      };

      // Add the modified object to the new array
      modifiedMatches.push(modifiedMatch);
    }

    //loop through the array and store the calculated result
    const predictedmatches = await Promise.all(
      modifiedMatches.map(
        async (match) => await calculateEveryAspects(next, match)
      )
    );

    //sorting the matches based on my predict
    predictedmatches.sort((a, b) => {
      const sameTeamDiff =
        parseFloat(b.sameTeamAggregate) - parseFloat(a.sameTeamAggregate);
      if (sameTeamDiff !== 0) {
        return sameTeamDiff;
      }

      const shotsOnTargetDiff =
        parseFloat(b.shotsOnTargetAggregate) -
        parseFloat(a.shotsOnTargetAggregate);
      if (shotsOnTargetDiff !== 0) {
        return shotsOnTargetDiff;
      }

      return parseFloat(b.goalAggregate) - parseFloat(a.goalAggregate);
    });
    // Partition the data into two arrays: above 1.5 sameTeamAggregate and the rest
    const [above15SameTeam, restOfData] = predictedmatches.reduce(
      (acc, item) => {
        const sameTeamAgg = parseFloat(item.sameTeamAggregate);
        const shotsOnTargetAggregate = parseFloat(item.shotsOnTargetAggregate);
        const teamAggregate = parseFloat(item.goalAggregate);
        if (
          sameTeamAgg >= 1.3 &&
          shotsOnTargetAggregate >= 4.5 &&
          teamAggregate >= 1.5
        ) {
          acc[0].push(item);
        } else {
          acc[1].push(item);
        }
        return acc;
      },
      [[], []]
    );

    // Sort the above 1.5 sameTeamAggregate data based on shotsOnTargetAggregate in descending order
    const sortedAbove15SameTeam = above15SameTeam.sort(
      (a, b) =>
        parseFloat(b.shotsOnTargetAggregate) -
        parseFloat(a.shotsOnTargetAggregate)
    );
    //sort rest of data based on shots shotsOnTargetAggregate in descending order

    const sortedRestOfData = restOfData.sort(
      (a, b) =>
        parseFloat(b.shotsOnTargetAggregate) -
        parseFloat(a.shotsOnTargetAggregate)
    );
    res.json([sortedAbove15SameTeam, sortedRestOfData]);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

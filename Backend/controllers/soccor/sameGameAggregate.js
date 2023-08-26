import axios from "axios";
import AppError from "../../utilities/appError.js";
// import * as cheerio from "cheerio";

// export async function sameGameAggregate(fixtureId) {
//   try {
//     // Make an HTTP GET request to the web page
//     const response = await axios.get(url);

//     // Load the HTML content of the web page into Cheerio
//     const $ = cheerio.load(response.data);

//     // Use Cheerio's selector to get the table div element with class name "list_1"
//     const statElements = $("span.stat");

//     // Extract the scores from the "span.stat" elements
//     const scores = statElements
//       .map((index, element) => $(element).text())
//       .get();

//     // Return the extracted scores as an array
//     const sameGameScores = scores.slice(0, 5);

//     // Map the array elements to numbers
//     const numbersArray = sameGameScores.map((score) => {
//       const [homeScore, awayScore] = score.split("-");
//       return Number(homeScore) + Number(awayScore);
//     });

//     // Calculate the sum using the reduce() method
//     const sum = numbersArray.reduce((total, score) => total + score, 0);

//     return sum / 10;
//   } catch (error) {
//     console.error("Error while scraping:", error.message);
//   }
// }

//returns the aggregate of last 5 matches for the same team
export async function sameGameAggregate(fixtureId, next) {
  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v3/predictions",
    params: { fixture: fixtureId },
    headers: {
      "X-RapidAPI-Key": process.env.XRapidAPIKey,
      "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
    },
  };

  try {
    const {
      data: { response },
    } = await axios.request(options);
    if (!response) return next(new AppError("No response for h2h data", 404));
    const matches = response[0].h2h;
    let sumHomeGoals = 0;
    let sumAwayGoals = 0;

    // Loop through the first five objects
    for (let i = 0; i < Math.min(3, matches.length); i++) {
      const match = matches[i];
      if (match.goals) {
        sumHomeGoals += match.goals.home;
        sumAwayGoals += match.goals.away;
      }
    }
    return (sumAwayGoals + sumHomeGoals) / 6;
  } catch (error) {
    next(new AppError(error.message, 500));
  }
}

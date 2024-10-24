import express from "express";
import {
  addTeam,
  calculatePrediction,
  getAllTeams,
  getFixtureForUpdate,
  updateTeamMatch,
} from "../../controllers/soccor/soccor.js";
import { auth, restrict } from "../../middleware/auth.js";

const router = express.Router();
//test

router.get("/", getAllTeams);
router.post("/", auth, restrict, addTeam);
// router.get("/stats", getStats);

// router.patch("/update", addLeague);
router.get("/predict/:leagueId", auth, restrict, calculatePrediction);

router.patch("/update/:teamID", auth, restrict, updateTeamMatch);
router.patch("/wholeWeekFixture/:teamID", auth, restrict, getFixtureForUpdate);

export default router;

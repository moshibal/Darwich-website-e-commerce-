import express from "express";
import {
  addTeam,
  calculatePrediction,
  getAllTeams,
  getFixtureForUpdate,
  getStats,
  updateTeamMatch,
} from "../../controllers/soccor/soccor.js";
import { auth, restrict } from "../../middleware/auth.js";

const router = express.Router();
//test

router.get("/", getAllTeams);
router.post("/", auth, restrict, addTeam);
router.get("/stats", getStats);
router.patch("/wholeWeekFixture/:teamID", auth, restrict, getFixtureForUpdate);
// router.patch("/update", addLeague);
router.get("/predict/:leagueId", auth, restrict, calculatePrediction);
router.patch("/update/:teamId", auth, restrict, updateTeamMatch);

export default router;

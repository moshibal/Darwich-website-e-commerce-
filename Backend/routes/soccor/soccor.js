import express from "express";
import {
  addTeam,
  calculatePrediction,
  getAllTeams,
  updateTeamMatch,
} from "../../controllers/soccor/soccor.js";
import { auth, restrict } from "../../middleware/auth.js";

const router = express.Router();
router.get("/", getAllTeams);
router.post("/", auth, restrict, addTeam);
// router.patch("/update", addLeague);
router.get("/predict/:leagueId", auth, restrict, calculatePrediction);
router.patch("/update/:teamId", auth, restrict, updateTeamMatch);

export default router;

import express from "express";
import {
  calculatePrediction,
  postMatch,
  updateEplTeam,
} from "../../controllers/soccor/epl.js";
import { auth, restrict } from "../../middleware/auth.js";

const router = express.Router();
router.post("/", auth, restrict, postMatch);
router.get("/predict/:leagueId", auth, restrict, calculatePrediction);
router.patch("/:teamId", auth, restrict, updateEplTeam);

export default router;

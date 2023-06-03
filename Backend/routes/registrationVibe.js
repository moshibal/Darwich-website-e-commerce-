import express from "express";

import { auth } from "../middleware/auth.js";
import {
  getAllStudents,
  postRegistration,
  removeStudents,
  updateAttendence,
} from "../controllers/booking.js";
const router = express.Router();
router.post("/", auth, postRegistration);
router.get("/", auth, getAllStudents);
router.post("/attendance", auth, updateAttendence);
router.delete("/:id", auth, removeStudents);

export default router;

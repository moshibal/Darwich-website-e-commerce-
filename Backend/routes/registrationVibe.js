import express from "express";

import { auth, restrict } from "../middleware/auth.js";
import {
  getAllStudents,
  postRegistration,
  removeStudents,
  updateAttendence,
} from "../controllers/booking.js";
const router = express.Router();
router.post("/", auth, restrict, postRegistration);
router.get("/", auth, restrict, getAllStudents);
router.patch("/attendance", auth, restrict, updateAttendence);
router.delete("/:id", auth, restrict, removeStudents);

export default router;

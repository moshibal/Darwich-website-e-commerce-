import express from "express";
import {
  getAllBookings,
  postBooking,
  deleteBooking,
} from "../controllers/booking.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();
router.get("/", auth, restrict, getAllBookings);
router.post("/", postBooking);
router.delete("/:id", auth, restrict, deleteBooking);

export default router;

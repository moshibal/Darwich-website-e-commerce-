import express from "express";
import { getAllBookings, postBooking } from "../controllers/booking.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.get("/", auth, getAllBookings);
router.post("/", postBooking);

export default router;

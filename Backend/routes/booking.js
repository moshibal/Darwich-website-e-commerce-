import express from "express";
import { getAllBookings, postBooking } from "../controllers/booking.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();
router.get("/", restrict, getAllBookings);
router.post("/", postBooking);
export default router;

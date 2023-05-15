import express from "express";
import { getAllBookings, postBooking } from "../controllers/booking.js";

const router = express.Router();
router.get("/", getAllBookings);
router.post("/", postBooking);
export default router;

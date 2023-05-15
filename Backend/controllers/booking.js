import bookingModel from "../models/booking.js";
import AppError from "../utilities/appError.js";
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel.find();
    res.status(200).json("bookings");
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};
export const postBooking = async (req, res, next) => {
  try {
    //simple check email and name check
    const booking = await bookingModel.find({ email: req.body.email });

    await bookingModel.create(req.body);
    res.status(201).json({ message: "Booking made successfully." });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

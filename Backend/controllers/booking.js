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
    const { name, email, date, phone, message } = req.body;
    const bookingObject = { name, email, phone, message, date: new Date(date) };
    //simple check email and name check
    const booking = await bookingModel.findOne({ email: req.body.email });
    if (booking) {
      const currentDate = new Date();
      const givenDate = new Date(date);

      if (givenDate < currentDate) {
        await bookingModel.updateOne({ date: new Date(req.body.date) });
        res.status(201).json({ message: "New Booking made successfully." });
      } else {
        return next(
          new AppError(
            "You have already made booking, please contact grooveandvibes for changing the date.",
            400
          )
        );
      }
    } else {
      await bookingModel.create(bookingObject);
      res.status(201).json({ message: "Booking made successfully." });
    }
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};

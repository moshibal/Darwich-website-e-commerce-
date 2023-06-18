import twilio from "twilio";
import bookingModel from "../models/booking.js";
import registerVibeModel from "../models/vibeRegister.js";
import AppError from "../utilities/appError.js";

//configuration for sms
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const client = twilio(accountSid, authToken);

//get all bookings
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingModel.find().sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};
//post bookings
export const postBooking = async (req, res, next) => {
  try {
    const { name, email, phone, date, message } = req.body;

    const bookingObject = { name, email, phone, message, date };

    //simple check email and name check
    const booking = await bookingModel.findOne({ email: req.body.email });
    if (booking) {
      const currentDate = new Date();
      const givenDate = new Date(date);

      if (givenDate > currentDate) {
        return next(
          new AppError(
            "You have already made booking, please contact grooveandvibes for changing the date.",
            400
          )
        );
      }
    } else {
      await bookingModel.create(bookingObject);
      await client.messages.create({
        to: process.env.MY_NUMBER,
        from: process.env.TWILIO_PHONE,
        body: `Booking has been made form ${name} for ${date}.Please check your admin page. Thank You😘`,
      });

      res.status(201).json({ message: "Booking made successfully." });
    }
  } catch (error) {
    next(new AppError(error.message, 404));
  }
};
//delete booking
export const deleteBooking = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const booking = await bookingModel.findById({ _id: bookingId });
    if (!booking) {
      return next(new AppError("No Booking with this id.", 404));
    }
    await booking.remove();
    const bookings = await bookingModel.find();
    res.json({ message: "Booking Removed", bookings });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
//for registration
export const postRegistration = async (req, res, next) => {
  try {
    const { name, email, phone, address, selectedClass } = req.body;
    const registerObject = { name, email, phone, address, selectedClass };
    const response = await registerVibeModel.create(registerObject);
    if (response) {
      res.status(201).json({ message: "new student added." });
    }
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await registerVibeModel.find();
    if (!students) {
      return next(new AppError("no students found.", 404));
    }
    res.status(200).json({ students });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
export const updateAttendence = async (req, res, next) => {
  try {
    const student = await registerVibeModel.findById({ _id: req.body._id });
    console.log(student);
    if (student) {
      if (req.body.reset === 0) {
        student.attendance = 0;
      } else {
        student.attendance += 1;
      }
      student.classes = student.classes;
      await student.save();

      res.json({ message: "Successfuly updated the attendance" });
    }
  } catch (error) {
    console.log(error.message);
    next(new AppError(error.message, 400));
  }
};
//remove students
export const removeStudents = async (req, res, next) => {
  try {
    const student = await registerVibeModel.findById(req.params.id);
    if (student) {
      await student.remove();
      res.json({ message: "Student Removed" });
    } else {
      next(new AppError("Student not fount", 404));
    }
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

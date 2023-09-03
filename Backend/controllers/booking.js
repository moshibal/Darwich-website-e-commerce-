// import twilio from "twilio";
import bookingModel from "../models/booking.js";
import registerVibeModel from "../models/vibeRegister.js";
import AppError from "../utilities/appError.js";
import Email from "../utilities/email.js";
import {
  bookingComformationAdmin,
  bookingComformationIndivisual,
  registrationTemplate,
  classremainingTemplete,
} from "../utilities/emailTemplate.js";

//configuration for sms
// const accountSid = process.env.TWILIO_SID;
// const authToken = process.env.TWILIO_TOKEN;
// const client = twilio(accountSid, authToken);

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
    const { name, email, phone, date, message, selectedClass, selectedGroup } =
      req.body;
    //booking
    const bookingObject = {
      name,
      email,
      phone,
      message,
      date,
    };
    //register
    const registerObject = {
      name,
      email,
      phone,
      selectedClass,
      selectedGroup,
    };

    //simple check email
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
      const bookingDetail = await bookingModel.create(bookingObject);

      //returns email template for admin
      const bookingComformation = bookingComformationAdmin(bookingDetail);

      //returns email template for individuals
      const bookingComformationTemplete =
        bookingComformationIndivisual(bookingObject);

      if (bookingDetail) {
        //register for new booking user
        const registration = await registerVibeModel.create(registerObject);
        if (registration) {
          //registration template
          const Template = registrationTemplate(registration);
          //to individual
          const email = new Email(registration, Template);
          await email.sendRegistration();
        }
        //for admin
        const adminEmail = new Email(bookingDetail, bookingComformation, true);
        await adminEmail.sendBooking();
        //for messaging
        // await client.messages.create({
        //   to: process.env.MY_NUMBER,
        //   from: process.env.TWILIO_PHONE,
        //   body: `Booking has been made form ${name} for ${date}.Please check your admin page. Thank You`,
        // });

        res.status(201).json({ message: "Successfully Registered." });
      }
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
    const { name, email, phone, address, selectedClass, selectedGroup } =
      req.body;
    const registerObject = {
      name,
      email,
      phone,
      address,
      selectedClass,
      selectedGroup,
    };
    const registration = await registerVibeModel.create(registerObject);
    if (registration) {
      //registration template
      const Template = registrationTemplate(registration);
      //to individual
      const email = new Email(registration, Template);
      await email.sendRegistration();

      res.status(201).json({ message: "new student added." });
    }
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
export const getAllStudents = async (req, res, next) => {
  try {
    const selectedGroup = req.query.selectedGroup;
    let students;

    if (selectedGroup) {
      students = await registerVibeModel.find({ selectedGroup: selectedGroup });
    } else {
      students = await registerVibeModel.find();
    }
    if (students.length === 0) {
      return next(
        new AppError("No students found for the selected group.", 400)
      );
    }

    res.status(200).json({ students });
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};
export const updateAttendence = async (req, res, next) => {
  try {
    const student = await registerVibeModel.findById({ _id: req.body._id });

    if (student) {
      if (req.body.reset === 0) {
        student.attendance = 0;
      } else {
        student.attendance += 1;
        if (student.attendance === 8) {
          //class remaining template
          const Template = classremainingTemplete(student);
          //to individual
          const email = new Email(student, Template);
          await email.sendClassUpdate();
        }
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

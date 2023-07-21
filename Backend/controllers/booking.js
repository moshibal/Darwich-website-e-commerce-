import twilio from "twilio";
import bookingModel from "../models/booking.js";
import registerVibeModel from "../models/vibeRegister.js";
import AppError from "../utilities/appError.js";
import Email from "../utilities/email.js";

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
    const { name, email, phone, date, message } = req.body;

    const bookingObject = {
      name,
      email,
      phone,
      message,
      date,
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
      const bookingComformation = `<!DOCTYPE html>
      <html>
      <head>
          <title>New Booking Has Been Made - Dance and Vibes</title>
      </head>
      <body>
          <h1>New Booking</h1>
          <p>Dear GrooveandVibes Team,</p>
          
          <p>There has been a new booking made. Please check your admin page for more information! <a href="https://grooveandvibes.com.au">Click here to view the details</a></p>

          
          <p>Booking Details:</p>
          <ul>
              <li><strong>Date:</strong> ${bookingDetail.name}</li>
              <li><strong>Date:</strong> ${bookingDetail.date}</li>
              <li><strong>Location:</strong> 491 Princes Highway Rockdale,Sydney</li>
                 
          </ul>
          
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          
          <p>Best regards,</p>
          <p>The Dance and Vibes Team</p>
      </body>
      </html>`;

      const bookingComformationTemplete = `<!DOCTYPE html>
      <html>
      <head>
          <title>Booking Confirmation - Dance and Vibes</title>
      </head>
      <body>
          <h1>Booking Confirmation</h1>
          <p>Dear ${bookingDetail.name},</p>
          
          <p>Thank you for booking with Dance and Vibes. We are excited to have you join us for an amazing dance experience!</p>
          
          <p>Booking Details:</p>
          <ul>
              <li><strong>Date:</strong> ${bookingDetail.date}</li>
              <li><strong>Location:</strong> 491 Princes Highway Rockdale,Sydney</li>
                 
          </ul>
          
          <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
          
          <p>Best regards,</p>
          <p>The Dance and Vibes Team</p>
      </body>
      </html>`;
      if (bookingDetail) {
        //to individual
        const email = new Email(bookingDetail, bookingComformationTemplete);
        await email.sendBooking();
        //for admin
        const adminEmail = new Email(bookingDetail, bookingComformation, true);
        await adminEmail.sendBooking();
        //for messaging
        // await client.messages.create({
        //   to: process.env.MY_NUMBER,
        //   from: process.env.TWILIO_PHONE,
        //   body: `Booking has been made form ${name} for ${date}.Please check your admin page. Thank You`,
        // });

        res.status(201).json({ message: "Booking made successfully." });
      }
    }
  } catch (error) {
    console.log(error);
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

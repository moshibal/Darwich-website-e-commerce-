import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },
  },
  { timestamps: true }
);
const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;

import mongoose from "mongoose";

import validator from "validator";

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name."],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Please provide your Phone Number."],
  },
  address: {
    type: String,
  },
  selectedClass: {
    type: String,
  },
  attendance: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
const registerVibeModel = mongoose.model("registervibes", registerSchema);
export default registerVibeModel;

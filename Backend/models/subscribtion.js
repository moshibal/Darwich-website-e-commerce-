import mongoose from "mongoose";
import validator from "validator";
const subscribtionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
});
export const subscribtionModel = mongoose.model(
  "subscribtion",
  subscribtionSchema
);

import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import Joi from "joi";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 10,
    maxlength: 16,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //this only works on save.
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not same!",
    },
  },
  passwordIssuedTime: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
});
//pre hook for hashing the password before saving in the database.
userSchema.pre("save", async function (next) {
  //simply checking if the password is modified or not, and thing to note: password is always modified when its first creating
  //only run if the password is modified
  if (!this.isModified("password")) return next();
  //hashing the password
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordIssuedTime = Date.now();
  //deleting the passwordConfirm property as we dont need this in database
  this.passwordConfirm = undefined;
  next();
});
//instance method for creating the token
userSchema.methods.createToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "90 days",
  });
  return token;
};
//instance method for checking the password
userSchema.methods.checkPassword = async (password, hashpassword) => {
  return await bcrypt.compare(password, hashpassword);
};
//instance method for creating resetToken
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = mongoose.model("User", userSchema);
export default User;

//validate function to validate user data.
export const validateUser = function (user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),

    password: Joi.string().min(10).max(16).required(),
    passwordConfirm: Joi.string().min(10).required(),
  });
  const { error, value } = schema.validate(user);
  return { error, value };
};

import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validateUser } from "../models/user.js";
import AppError from "../utilities/appError.js";
export const signup = asyncHandler(async (req, res, next) => {
  const { error, value } = validateUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  if (error) {
    next(error);
  }

  const newUser = await User.create(value);
  const token = newUser.createToken();

  res.status(201).json({
    status: "success",

    data: {
      token,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    },
  });
});
export const login = asyncHandler(async (req, res, next) => {
  //check if email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please provide email and password", 401));
  }
  //check if the user existed with the email
  const user = await User.findOne({ email }).select("+password");

  //check password is correct or not

  if (!user || !(await user.checkPassword(password, user.password))) {
    return next(new AppError("the email or the password is incorrect.", 401));
  }
  //create a token and send

  const token = user.createToken();
  res.status(200).json({
    status: "success",
    data: { token, name: user.name, email: user.email, isAdmin: user.isAdmin },
  });
});

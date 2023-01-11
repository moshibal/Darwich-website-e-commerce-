import User from "../models/user.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { validateUser } from "../models/user.js";
import AppError from "../utilities/appError.js";
import Email from "../utilities/email.js";
import crypto from "crypto";
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
  //sending welcome email
  const url = `${req.protocol}://${req.get("host")}/profile`;
  const email = new Email(newUser, url);
  await email.sendWelcome();

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
//forgotPassword
export const forgotPassword = async (req, res, next) => {
  console.log(req.get("host"));
  try {
    //get user based on email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(
        new AppError(
          "There is no user with this email address, Please type in correct email address.",
          404
        )
      );
    }
    //generate the random reset token
    const resetToken = user.createResetToken();
    await user.save({ validateModifiedOnly: true });
    //sent it to users email
    const resetURL = `${req.protocol}://localhost:3000/resetpassword/${resetToken}`;
    const message = `Forgot your password? submit your new patch request with new password and password confirm to: <a href=${resetURL}>${resetURL}</a>\n . If you didn't forget your password, please ignore this email.`;

    try {
      await new Email(user, resetURL, message).sendForgetPassword();
      res
        .status(200)
        .json({ status: "success", message: "Token sent to email." });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateModifiedOnly: true });
      return next(
        new AppError("there was an error sending email.try again later", 500)
      );
    }
  } catch (error) {
    return new AppError(error);
  }
};
//resetPassword
export const resetPassword = async (req, res, next) => {
  //get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //if token has not been expired and there is user,set the new password
  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.save();
  //update passwordIssuedTime property for the user
  //log the user in,send JWT
  const token = user.createToken();
  res.status(200).json({
    status: "success",
    data: { token, name: user.name, email: user.email, isAdmin: user.isAdmin },
  });
};

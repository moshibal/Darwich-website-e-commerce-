import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/user.js";
import AppError from "../utilities/appError.js";
export const getAllUser = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};
export const getMe = async (req, res, next) => {
  res.send(req.user);
};
export const updatePassword = asyncHandler(async (req, res, next) => {
  const password = req.body.oldPassword;

  //get user from the collections
  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    return next(new AppError("user doesnot exist", 401));
  }
  //check if the current password is correct

  const isPasswordCorrect = await user.checkPassword(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError("the password provided doesnot match", 401));
  }
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  res.status(201).json({
    token: user.createToken(),
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    id: user._id,
  });
});
export const updateMe = asyncHandler(async (req, res, next) => {
  const updateObject = {
    email: req.body.email || req.user.email,
    name: req.body.name || req.user.name,
  };

  let updatedUser = await User.findByIdAndUpdate(req.user._id, updateObject, {
    new: true,
  });

  res.json({
    token: updatedUser.createToken(),
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    id: updatedUser._id,
  });
});

import User from "../models/user.js";
export const getAllUser = async (req, res, next) => {
  const users = await User.find();
  res.json(users);
};

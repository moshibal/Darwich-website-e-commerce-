import User from "../models/user.js";
import { validateUser } from "../models/user.js";
export const signup = async (req, res, next) => {
  try {
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
      token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  //check if email and password
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new Error("please provide email and password"));
  }
  //check if the user existed with the email
  const user = await User.findOne({ email }).select("+password");

  //check password is correct or not

  if (!user || !(await user.checkPassword(password, user.password))) {
    next(new Error("the email or the password is incorrect."));
  }
  //create a token and send

  const token = user.createToken();
  res.status(200).json({
    status: "success",
    token,
  });
};

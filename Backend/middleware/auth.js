import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const auth = async (req, res, next) => {
  //check if the authorization header is sent or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    next(new Error("No token provided,please log in first"));
  }

  //verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    next(new Error("token provided is not correct"));
  }
  console.log(decoded);
  //check if the user still exists
  const user = await User.findById(decoded._id);
  if (!user) {
    next(new Error("no user found,please try with correct login or sign up"));
  }
  //check if the password is changed after the token being created.

  if (Math.round(user.passwordIssuedTime.getTime() / 1000) > decoded.iat) {
    next(
      new Error(
        "Password has been changed after the token was generated, please login again."
      )
    );
  }
  next();
};

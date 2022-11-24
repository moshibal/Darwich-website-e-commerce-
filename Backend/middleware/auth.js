import jwt from "jsonwebtoken";
import User from "../models/user.js";
import AppError from "../utilities/appError.js";
export const auth = async (req, res, next) => {
  //check if the authorization header is sent or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return next(new AppError("No token provided,please log in first", 401));
  }

  //verify the token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return next(new AppError("token provided is not correct", 401));
  }

  //check if the user still exists
  const user = await User.findById(decoded._id);
  if (!user) {
    return next(
      new AppError(
        "no user found,please try with correct login or sign up",
        401
      )
    );
  }
  //check if the password is changed after the token being created.
  //just for now skipping this password changed condition....will come back
  // if (
  //   parseInt(user.passwordIssuedTime.getTime() / 1000, 10) - 1000 >
  //   decoded.iat
  // ) {
  //   next(
  //     new AppError(
  //       "Password has been changed after the token was generated, please login again.",
  //       401
  //     )
  //   );
  // }
  req.user = user;
  next();
};
export const restrict = (req, res, next) => {
  if (!req.user.isAdmin) {
    next(new AppError("Your are not authorized for this request.", 403));
  }
  next();
};

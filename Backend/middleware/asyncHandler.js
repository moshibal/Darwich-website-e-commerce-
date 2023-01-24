import AppError from "../utilities/appError.js";

const asyncHandler = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};
export default asyncHandler;

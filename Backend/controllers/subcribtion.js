import { subscribtionModel } from "../models/subscribtion";
import AppError from "../utilities/appError";
export const subscribe = async (req, res, next) => {
  try {
    const email = req.body.email;
    const emailExist = await subscribtionModel.findOne({ email: email });

    if (emailExist) {
      return next(new AppError("you are already subscribed. Thank You..", 400));
    } else {
      const emailcreated = await subscribtionModel.create({ email: email });
      if (emailcreated) {
        res.status(200).json({
          message:
            "subscribed to darwich.You will be notified for any updates.",
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

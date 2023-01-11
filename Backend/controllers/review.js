import productModel from "../models/product.js";
import AppError from "../utilities/appError.js";
import asyncHandler from "../middleware/asyncHandler.js";

//creating the review
export const createReview = asyncHandler(async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const product = await productModel.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return next(new AppError("Product is already reviewed", 400));
      }
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.ratings =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      await product.save();
      res.status(201).json({ message: "Review Added" });
    }
  } catch (error) {
    next(new AppError(error));
  }
});

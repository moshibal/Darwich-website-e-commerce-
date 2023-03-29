import productModel from "../models/product.js";
import AppError from "../utilities/appError.js";
import asyncHandler from "../middleware/asyncHandler.js";
//get all the product
export const getAllProducts = async (req, res, next) => {
  try {
    const pageSize = 8;
    const pageNumber = Number(req.query.pageNumber || 1);
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await productModel.countDocuments({ ...keyword });
    const products = await productModel
      .find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1));
    res
      .status(200)
      .json({ pageNumber, products, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    next(error);
  }
};
// get product by id
export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const productdetail = await productModel.findById({ _id: id });
    res.status(200).json(productdetail);
  } catch (error) {
    next(error);
  }
};
//delete product
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Removed" });
  } else {
    next(new AppError("Product not fount", 404));
  }
});
//creating the product
export const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const sampleProductObject = {
      name: "sample name",
      price: 0,
      imageUri: "/images/sample.jpg",
      description: "sample product discription",
      category: "sample category",
      availabitity: false,
    };
    const productdetails =
      Object.keys(req.body).length === 0 ? sampleProductObject : req.body;

    const product = await productModel.create(productdetails);
    res.status(201).json(product);
  } catch (error) {
    next(new AppError(error));
  }
});
//updating the product
export const updateProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    price,
    specialPrice,
    imageUri,
    description,
    category,
    availability,
  } = req.body;
  const product = await productModel.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.specialPrice = specialPrice;
    product.imageUri = imageUri;
    product.category = category;
    product.description = description;
    product.availabitity = availability;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    return next(new AppError("Product not fount", 404));
  }
  res.status(201).json(product);
});
export const getAvailableProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ availabitity: true });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
//fetch specials
export const getSpecialProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ specialPrice: { $gte: 1 } });

    if (products.length === 0) {
      // return next(
      //   new AppError("There are no special products, Thank you", 400)
      // );
      return res
        .status(200)
        .json({ message: "no products found with special." });
    } else {
      res.status(200).json([...products]);
    }
  } catch (error) {
    next(error);
  }
};
//post specials
export const postSpecialProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    let product = await productModel.findById(productId);
    if (!product) {
      return next(new AppError("no product with given id found", 404));
    }
    product.specialPrice = req.body.specialPrice;
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

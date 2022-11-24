import productModel from "../models/product.js";
import specialProductModel from "../models/specialProduct.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;

    const productdetail = await productModel.findById({ _id: id });
    res.status(200).json(productdetail);
  } catch (error) {
    next(error);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const productdetails = req.body;

    const product = await productModel.create(productdetails);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};
export const getAvailableProducts = async (req, res, next) => {
  try {
    const products = await productModel.find({ availabitity: true });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getSpecialProducts = async (req, res, next) => {
  try {
    const product = await specialProductModel.find().populate("product");

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};
export const postSpecialProduct = async (req, res, next) => {
  try {
    const productDetails = req.body;
    const product = await specialProductModel.create(productDetails);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

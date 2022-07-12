import product from "../models/product.js";
import { specialProduct } from "../models/product.js";
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getAvailableProducts = async (req, res, next) => {
  try {
    const products = await product.find({ availabitity: true });
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const getSpecialProducts = async (req, res, next) => {
  try {
    const products = await specialProduct.find({}).populate("product");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};
export const postSpecialProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const productDetails = req.body;
    const product = await specialProduct.create(productDetails);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

import express from "express";
import {
  getAllProducts,
  getAvailableProducts,
  getSpecialProducts,
  postSpecialProduct,
} from "../controllers/product.js";
const router = express.Router();
router.get("/", getAllProducts);
router.get("/available", getAvailableProducts);
router.get("/special", getSpecialProducts);
router.post("/special", postSpecialProduct);
export default router;

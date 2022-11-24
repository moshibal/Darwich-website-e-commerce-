import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  getAvailableProducts,
  getSpecialProducts,
  postSpecialProduct,
} from "../controllers/product.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();
//available products
router.get("/available", getAvailableProducts);
//all products
router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:productId", getProduct);
//for special products
router.get("/special", getSpecialProducts);
router.post("/special", postSpecialProduct);
export default router;

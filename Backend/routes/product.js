import express from "express";

import {
  getAllProducts,
  getProduct,
  createProduct,
  getAvailableProducts,
  getSpecialProducts,
  postSpecialProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.js";
import { createReview } from "../controllers/review.js";
import { auth, restrict } from "../middleware/auth.js";

const router = express.Router();
//for special products
router.get("/special", getSpecialProducts);
router.post("/special/:productId", postSpecialProduct);
//available products
router.get("/available", getAvailableProducts);
//all products
router.get("/", getAllProducts);
router.get("/:productId", getProduct);

//for product reviews
router.post("/:id/review", auth, createReview);

//for admin uses
router.post("/", auth, restrict, createProduct);
router.delete("/:id", auth, restrict, deleteProduct);
router.put("/:id", auth, restrict, updateProduct);
export default router;

import express from "express";
import {
  getOrderById,
  postOrder,
  updateOrderToPaid,
  getMyOrder,
} from "../controllers/order.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

//all products

router.post("/", auth, postOrder);
router.get("/myorders", auth, getMyOrder);

router.get("/:id", auth, getOrderById);
router.put("/:id/pay", auth, updateOrderToPaid);

export default router;

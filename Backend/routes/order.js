import express from "express";
import {
  getOrderById,
  postOrder,
  updateOrderToPaid,
  getMyOrder,
  getAllOrders,
  updateOrderToDelivered,
} from "../controllers/order.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();

//all order

router.post("/", auth, postOrder);
router.get("/myorders", auth, getMyOrder);

router.get("/:id", auth, getOrderById);
//Admin Uses
router.get("/", auth, restrict, getAllOrders);
router.put("/:id/pay", auth, updateOrderToPaid);
router.put("/:id/deliver", auth, restrict, updateOrderToDelivered);

export default router;

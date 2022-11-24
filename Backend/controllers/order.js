import orderModel from "../models/order.js";
import AppError from "../utilities/appError.js";
//post order
export const postOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const order = await orderModel.create({
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user.id,
    });
    res.status(201).json({ status: "success", _id: order._id });
  } catch (error) {
    next(error);
  }
};
//get order by ID
export const getOrderById = async (req, res, next) => {
  try {
    const order = await orderModel
      .findById({ _id: req.params.id })
      .populate("user", "name email");

    if (order) {
      res.status(200).json({ status: "success", order });
    } else {
      next(AppError("order not found", 404));
    }
  } catch (error) {
    next(error);
  }
};
//update order to paid
export const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };
    } else {
      next(AppError("order not found", 404));
    }
    const updatedOrder = await order.save();
    res.status(200).json({ status: "success", updatedOrder });
  } catch (error) {
    next(error);
  }
};
//get my orders
export const getMyOrder = async (req, res, next) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    res.status(200).json({ status: "success", orders });
  } catch (error) {
    next(error);
  }
};

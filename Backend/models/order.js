import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        imageUri: { type: String, required: true },
        price: { type: Number, required: true },
        _id: false,
        id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    shippingAddress: {
      unit: { type: String },
      street: { type: String },
      suburb: { type: String },
      state: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: {
      type: Date,
    },

    deliveredAt: {
      type: Date,
    },
    paymentMethod: { type: String },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
  },
  { timestamps: true }
);
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;

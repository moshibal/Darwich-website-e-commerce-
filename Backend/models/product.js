import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  imageUri: {
    type: "String",
    required: true,
  },
  availabitity: {
    type: "Boolean",
    default: "true",
  },
});
const product = mongoose.model("products", productSchema);
export default product;
const specialProductSchema = new mongoose.Schema({
  special: {
    type: "Boolean",
  },
  message: {
    type: "String",
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
});
export const specialProduct = mongoose.model(
  "SpecialProduct",
  specialProductSchema
);

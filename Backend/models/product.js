import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUri: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  availabitity: {
    type: Boolean,
    default: "true",
  },
});
const productModel = mongoose.model("Product", productSchema);

export default productModel;

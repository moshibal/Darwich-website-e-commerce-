import mongoose from "mongoose";
const specialProductSchema = new mongoose.Schema({
  special: {
    type: Boolean,
  },
  message: {
    type: String,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});
const specialProductModel = mongoose.model(
  "Specialproduct",
  specialProductSchema
);
export default specialProductModel;

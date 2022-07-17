import express from "express";
import cors from "cors";
import connectDB from "./db.js";

// importing app modules
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
// ALL Routers
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});
export default app;

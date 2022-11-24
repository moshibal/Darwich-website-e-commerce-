import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import AppError from "./utilities/appError.js";
import globalErrorController from "./controllers/errorController.js";

// importing app modules
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
const app = express();
const connectDatabase = (async () => {
  await connectDB();
})();

app.use(cors());
app.use(express.json());
// ALL Routers
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
});
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `can't find ${req.originalUrl} route on this server, please type the correct route.`,
      404
    )
  );
});
app.use(globalErrorController);
export default app;

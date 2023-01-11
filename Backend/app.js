import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./db.js";
import AppError from "./utilities/appError.js";
import globalErrorController from "./controllers/errorController.js";
import path from "path";
const __dirname = path.resolve();

// importing app modules
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import uploadRouter from "./routes/uploadRoute.js";

const app = express();
//db connnection
(async () => {
  await connectDB();
})();
//third party middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());
app.use(express.json());
//server static files
app.use("/uploads", express.static(__dirname + "/uploads"));

// ALL Routers
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
});
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/orders", orderRouter);
app.use("/upload", uploadRouter);

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

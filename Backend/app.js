import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import ExpressMongoSanitize from "express-mongo-sanitize";
import connectDB from "./db.js";
import AppError from "./utilities/appError.js";
import globalErrorController from "./controllers/errorController.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve();

// importing app modules
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import uploadRouter from "./routes/uploadRoute.js";
import { subscribtionModel } from "./models/subscribtion.js";

const app = express();
//db connnection
(async () => {
  await connectDB();
})();
//third party middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//global middleware
app.use(cors());

app.use(helmet());
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this ip, Please try after 1 hour",
});
app.use(limiter);

app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
//data sanization against noSQL query injection
app.use(ExpressMongoSanitize());

//data sanization against XSS
app.use(xss());
app.use(hpp());
//server static files
app.use("/api/uploads", express.static(__dirname + "/uploads"));

// ALL Routers
app.get("/api/config/paypal", (req, res) => {
  res.send({ clientID: process.env.PAYPAL_CLIENT_ID });
});
app.post("/api/subscribtion", async (req, res, next) => {
  try {
    const email = req.body.email;
    const emailExist = await subscribtionModel.findOne({ email: email });

    if (emailExist) {
      return next(new AppError("you are already subscribed. Thank You..", 400));
    } else {
      const emailcreated = await subscribtionModel.create({ email: email });
      if (emailcreated) {
        res.status(200).json({
          message:
            "subscribed to darwich.You will be notified for any updates.",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"))
  );
}
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

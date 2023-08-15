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

// importing app modules/ Routers
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import orderRouter from "./routes/order.js";
import uploadRouter from "./routes/uploadRoute.js";
import bookingRouter from "./routes/booking.js";
import vibeRegistrationRouter from "./routes/registrationVibe.js";
import soccorRouter from "./routes/soccor/soccor.js";

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
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/vibeRigistration", vibeRegistrationRouter);
app.use("/api/soccor", soccorRouter);

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

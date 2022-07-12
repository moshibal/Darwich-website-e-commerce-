import express from "express";
import cors from "cors";
import connectDB from "./db.js";

// importing app modules
import productRouter from "./routes/product.js";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
// ALL Routers
app.use("/products", productRouter);
export default app;

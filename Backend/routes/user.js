import express from "express";
import { login, signup } from "../controllers/authentication.js";
import { getAllUser } from "../controllers/user.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/", getAllUser);
export default router;

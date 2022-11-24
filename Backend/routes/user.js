import express from "express";
import { login, signup } from "../controllers/authentication.js";
import {
  getAllUser,
  getMe,
  updateMe,
  updatePassword,
} from "../controllers/user.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/", auth, restrict, getAllUser);
router.get("/me", auth, getMe);
//updating the user
router.patch("/updatePassword", auth, updatePassword);
router.patch("/updateMe", auth, updateMe);
export default router;

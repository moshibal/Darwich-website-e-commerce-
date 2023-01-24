import express from "express";
import {
  login,
  signup,
  forgotPassword,
  resetPassword,
  logout,
} from "../controllers/authentication.js";
import {
  getAllUser,
  getMe,
  updateMe,
  updatePassword,
  deleteUser,
  updateUserAdmin,
  getUserById,
} from "../controllers/user.js";
import { auth, restrict } from "../middleware/auth.js";
const router = express.Router();
//normal signup and login
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", auth, getMe);
//forgot and reset password
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);
//updating the user
router.patch("/updatePassword", auth, updatePassword);
router.patch("/updateMe", auth, updateMe);
//Admin role
router.get("/", auth, restrict, getAllUser);
router.get("/:id", auth, restrict, getUserById);
router.delete("/:id", auth, restrict, deleteUser);
router.patch("/:id", auth, restrict, updateUserAdmin);

export default router;

import express from "express";
import { forgotPassword, login, registerUser, resetPassword, verifyUser } from "../controller/user.controller.js";
import { isLoggedin } from "../middleware/auth.middleware.js"

const router = express.Router();
router.post('/register', registerUser)
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/profile", isLoggedin);
router.get("/forgotpassword", forgotPassword)
router.post("/resetpassword/:token", resetPassword);

export default router;
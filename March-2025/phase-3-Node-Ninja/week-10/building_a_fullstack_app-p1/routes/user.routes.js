import express from "express";
import { login, registerUser, verifyUser } from "../controller/user.controller.js";
import { isLoggedin } from "../middleware/auth.middleware.js"

const router = express.Router();
router.post('/register', registerUser)
router.get("/verify/:token", verifyUser);
router.post("/login", login);
router.get("/profile", isLoggedin);

export default router;
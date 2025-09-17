import { Router } from "express"
import { registerUser } from "../controllers/auth.controller.js";
import validate from "../middlewares/validator.middleware.js";


const router = Router()

router.route("/register").post(validateProjectPermission([]), validate, registerUser)

export default router;

import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";

// import user routes 
import UserRouter from "./routes/auth.route.js"

dotenv.config();
const port = 3000;
const app = express();

// cors setup
app.use(
    cors({
        origin: process.env.BASE_URL,
        credentials: true,
        methods: ["GET", "POST", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

// accept data?.(true form)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "test checked"
    })
    // res.send("CODE GO005")
})

app.use("api/v1/users", UserRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

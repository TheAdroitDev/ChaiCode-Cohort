import app from "./app";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config({
    path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(() => { `Server is running on: ${PORT}` })
    })
    .catch((err)=>{
        console.log('server connection error',err);
        process.exit(1)
    })


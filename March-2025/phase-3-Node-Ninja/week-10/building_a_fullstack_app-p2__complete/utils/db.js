import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// export a function that connects to db

const db = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connection to MongoDB Successfully!');
        })
        .catch((err) => {
            console.log("Connection to MongoDB failed!", err)
        })
};

export default db;
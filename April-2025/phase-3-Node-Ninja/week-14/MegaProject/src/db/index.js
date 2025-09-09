import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongoDB connection success');
    } catch (error) {
        console.log('mongoDB connection failure',error);
        process.exit(1);
    }
}

export default connectDB;
import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return;

    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("DB connection error:", error);
    }
};

export default connectDB;

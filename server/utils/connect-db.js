import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    
    if (!process.env.MONGO_URI) {
      throw new Error("❌ Missing MONGO_URI in .env file!");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB connected successfully`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);

    throw error;
  }
};

export default connectDB;

import mongoose from "mongoose";
import { envConfig } from "@config/env.js";

export async function connectToDatabase(): Promise<void> {
    try {
        await mongoose.connect(envConfig.MONGO_URI);

        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed", error);

        process.exit(1);
    }
}

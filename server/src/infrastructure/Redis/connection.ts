import { Redis } from "ioredis";
import { envConfig } from "@config/env.js";

export const redisConnection = new Redis(
    envConfig.REDIS_URL,
    {
        maxRetriesPerRequest: null,
    }
);

redisConnection.on("connect", () => {
    console.log("✅ Redis connected");
});

redisConnection.on("error", (error) => {
    console.error("❌ Redis error:", error);
});
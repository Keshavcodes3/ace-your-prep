export type Config = {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";

    MONGO_URI: string;
    REDIS_URL: string,
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;

    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES_IN: string;

    RESEND_API_KEY: string;
    MAIL_FROM: string;

};


export const envConfig: Config = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: (process.env.NODE_ENV as Config["NODE_ENV"]) || "development",
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    REDIS_URL: process.env.REDIS_URL || "localhost:3000",
    RESEND_API_KEY: process.env.RESEND_API_KEY!,
    MAIL_FROM: process.env.MAIL_FROM!
};
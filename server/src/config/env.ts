export type Config = {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    MONGO_URI: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;

};



export const envConfig: Config = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: (process.env.NODE_ENV as Config["NODE_ENV"]) || "development",
    MONGO_URI: process.env.MONGO_URI || "",
    JWT_SECRET: process.env.JWT_SECRET || "",
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
};
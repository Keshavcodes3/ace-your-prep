import jwt from "jsonwebtoken";
import { envConfig } from "@config/env.js";
import { type JwtPayload } from "./auth.types.js";


export function generateAccessToken(
    payload: JwtPayload
): string {
    return jwt.sign(
        payload,
        envConfig.JWT_SECRET,
        {
            expiresIn: envConfig.JWT_EXPIRES_IN,
        } as jwt.SignOptions
    );
}


export function generateRefreshToken(
    payload: JwtPayload
): string {
    return jwt.sign(
        payload,
        envConfig.JWT_REFRESH_SECRET,
        {
            expiresIn: envConfig.JWT_REFRESH_EXPIRES_IN,
        } as jwt.SignOptions
    );
}
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "@config/env.js";
import { ApiError } from "@/middlewares/apiError.js";
import { type JwtPayload } from "@/modules/auth/auth.types.js";
export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export const authMiddleware = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

        if (!token) {
            throw new ApiError("Access token required", 401, "TOKEN_REQUIRED");
        }

        const decoded = jwt.verify(
            token,
            envConfig.JWT_SECRET
        ) as JwtPayload;

        req.user = decoded;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError("Invalid token", 401, "INVALID_TOKEN");
        }
        throw error;
    }
};
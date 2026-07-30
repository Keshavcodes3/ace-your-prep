import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { ApiResponse as apiResponse } from "@/middlewares/apiResponse.js";
import { generateAccessToken } from "./auth.utils.js";
import { Types } from "mongoose";
class AuthController {

    register = asyncHandler(
        async (req: Request, res: Response) => {
            const user = await authService.register(
                req.body
            );
            const payload = {
                userId: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
            const token = generateAccessToken(payload)
            res.cookie("token", token)
            return res.status(201).json(
                new apiResponse(
                    user,
                    "User registered successfully"
                )
            );
        }
    );


    login = asyncHandler(
        async (req: Request, res: Response) => {
            const user = await authService.login(
                req.body
            );
            const payload = {
                userId: user.id.toString(),
                name: user.name,
                email: user.email,
                role: user.role
            }
            const token = generateAccessToken(payload)
            res.cookie("token", token)
            return res.status(200).json(
                new apiResponse(
                    user,
                    "Login successful"
                )
            );
        }
    );


    getProfile = asyncHandler(
        async (req: Request, res: Response) => {

            const user = await authService.getProfile(
                (req as any).user.userId
            );
            return res.status(200).json(
                new apiResponse(
                    user,
                    "Profile fetched successfully"
                )
            );
        }
    );
}


export const authController = new AuthController();
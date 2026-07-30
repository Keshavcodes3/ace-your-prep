import { userRepository } from "@/modules/auth/auth.repository.js";
import type { Request, Response, NextFunction } from "express"

export const authorize = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        let userRole = user.role;

        if (!userRole && user.userId) {
            try {
                const dbUser = await userRepository.findById(user.userId.toString());
                userRole = dbUser?.role;
            } catch (error) {
                return res.status(403).json({
                    message: "forbidden"
                });
            }
        }

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                message: "forbidden"
            });
        }
        next();
    };
};
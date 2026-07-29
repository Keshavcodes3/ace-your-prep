import { userRepository } from "./auth.repository.js";
import type { RegisterInput, LoginInput } from "./auth.types.js";
import bcrypt from "bcrypt";
import { ApiError } from "@/middlewares/apiError.js";
import { emailQueue } from "@/infrastructure/Bull/Email/email.queue.js";
class AuthService {
    async register(data: RegisterInput) {
        const existingUser = await userRepository.findByEmail(
            data.email
        );

        if (existingUser) {
            throw new ApiError(
                "User already exists",
                409,
                "USER_EXISTS"
            );
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            12
        );

        const user = await userRepository.createUser({
            ...data,
            password: hashedPassword,
        });
        await emailQueue.add("email-queue", {
            name: user.name,
            email: user.email
        })

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }


    async login(data: LoginInput) {
        //@ts-nocheck
        const user = await userRepository.findByIdWithPassword(
            (await userRepository.findByEmail(data.email))._id.toString()
        );

        if (!user) {
            throw new ApiError(
                "Invalid credentials",
                401,
                "INVALID_CREDENTIALS"
            );
        }

        const isPasswordCorrect = await bcrypt.compare(
            data.password,
            user.password
        );

        if (!isPasswordCorrect) {
            throw new ApiError(
                "Invalid credentials",
                401,
                "INVALID_CREDENTIALS"
            );
        }

        return {
            id: user._id,
            name: user.name,
            email: user.email,
        };
    }


    async getProfile(userId: string) {
        const user = await userRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                "User not found",
                404,
                "USER_NOT_FOUND"
            );
        }

        return user;
    }
}

export const authService = new AuthService();
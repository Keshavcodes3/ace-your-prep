import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
    isVerified: boolean;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isVerified: {
            type: Boolean,
            default: false,
        },

        refreshToken: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model<IUser>(
    "User",
    userSchema
);
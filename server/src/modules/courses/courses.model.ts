import mongoose, { Schema, Document } from "mongoose";
import type {
    CourseCategory,
    CourseDifficulty,
} from "./courses.types.js";


export interface ICourse extends Document {
    title: string;
    slug: string;
    description: string;

    category: CourseCategory;

    difficulty: CourseDifficulty;

    thumbnail?: string;

    instructor: mongoose.Types.ObjectId;

    totalModules: number;
    totalLessons: number;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}


const courseSchema = new Schema<ICourse>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            maxlength: 1000,
        },

        category: {
            type: String,
            enum: [
                "reasoning",
                "quantitative-aptitude",
                "verbal",
                "programming",
                "general",
            ],
            required: true,
        },

        difficulty: {
            type: String,
            enum: [
                "beginner",
                "intermediate",
                "advanced",
            ],
            default: "beginner",
        },

        thumbnail: {
            type: String,
        },

        instructor: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        totalModules: {
            type: Number,
            default: 0,
        },

        totalLessons: {
            type: Number,
            default: 0,
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


courseSchema.index({
    title: "text",
    description: "text",
});


courseSchema.index({
    category: 1,
    difficulty: 1,
});


courseSchema.index({
    instructor: 1,
});


export const CourseModel = mongoose.model<ICourse>(
    "Course",
    courseSchema
);
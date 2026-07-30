import mongoose, { Document, Schema } from "mongoose";

export interface ICourseModule extends Document {
    title: string;
    description: string;

    courseId: mongoose.Types.ObjectId;

    order: number;

    totalLessons: number;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const courseModuleSchema = new Schema<ICourseModule>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        courseId: {
            type: Schema.Types.ObjectId,
            ref: "Course",
            required: true,
            index: true,
        },

        order: {
            type: Number,
            required: true,
            min: 1,
        },

        totalLessons: {
            type: Number,
            default: 0,
            min: 0,
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

courseModuleSchema.index(
    {
        courseId: 1,
        order: 1,
    },
    {
        unique: true,
    }
);
courseModuleSchema.index({
    title: "text",
    description: "text",
});

export const CourseModuleModel =
    mongoose.model<ICourseModule>(
        "CourseModule",
        courseModuleSchema
    );
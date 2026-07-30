import mongoose, { Document, Schema } from "mongoose";

export interface ILesson extends Document {
    title: string;
    description: string;

    moduleId: mongoose.Types.ObjectId;

    content: string;

    videoUrl?: string;

    durationInSeconds: number;

    order: number;

    isPreview: boolean;
    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
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

        moduleId: {
            type: Schema.Types.ObjectId,
            ref: "CourseModule",
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
        },

        videoUrl: {
            type: String,
            default: "",
            trim: true,
        },

        durationInSeconds: {
            type: Number,
            required: true,
            min: 0,
        },

        order: {
            type: Number,
            required: true,
            min: 1,
        },

        isPreview: {
            type: Boolean,
            default: false,
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

/**
 * Fast lookup of lessons inside a module.
 */
lessonSchema.index({
    moduleId: 1,
});

/**
 * Prevent duplicate lesson order inside a module.
 */
lessonSchema.index(
    {
        moduleId: 1,
        order: 1,
    },
    {
        unique: true,
    }
);

/**
 * Prevent duplicate lesson titles inside a module.
 */
lessonSchema.index(
    {
        moduleId: 1,
        title: 1,
    },
    {
        unique: true,
    }
);

/**
 * Full-text search.
 */
lessonSchema.index({
    title: "text",
    description: "text",
});

export const LessonModel = mongoose.model<ILesson>(
    "Lesson",
    lessonSchema
);
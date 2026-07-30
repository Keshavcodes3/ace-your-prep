import mongoose, {
    Schema,
    Document,
} from "mongoose";

export interface IQuestionOption {
    id: string;
    text: string;
}

export interface IQuestion extends Document {

    lessonId: mongoose.Types.ObjectId;

    question: string;

    type: "mcq" | "multiple-select";

    options: IQuestionOption[];

    correctOptionIds: string[];

    explanation: string;

    difficulty: "easy" | "medium" | "hard";

    marks: number;

    order: number;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
}

const optionSchema =
    new Schema<IQuestionOption>(
        {
            id: {
                type: String,
                required: true,
                trim: true,
            },

            text: {
                type: String,
                required: true,
                trim: true,
            },
        },
        {
            _id: false,
        }
    );

const questionSchema =
    new Schema<IQuestion>(
        {
            lessonId: {
                type: Schema.Types.ObjectId,
                ref: "Lesson",
                required: true,
                index: true,
            },

            question: {
                type: String,
                required: true,
                trim: true,
            },

            type: {
                type: String,
                enum: [
                    "mcq",
                    "multiple-select",
                ],
                default: "mcq",
            },

            options: {
                type: [optionSchema],
                required: true,
            },

            correctOptionIds: {
                type: [String],
                required: true,
            },

            explanation: {
                type: String,
                required: true,
                trim: true,
            },

            difficulty: {
                type: String,
                enum: [
                    "easy",
                    "medium",
                    "hard",
                ],
                default: "easy",
            },

            marks: {
                type: Number,
                default: 1,
                min: 1,
            },

            order: {
                type: Number,
                required: true,
                min: 1,
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

questionSchema.index({
    lessonId: 1,
});

questionSchema.index(
    {
        lessonId: 1,
        order: 1,
    },
    {
        unique: true,
    }
);

questionSchema.index({
    question: "text",
    explanation: "text",
});

export const QuestionModel =
    mongoose.model<IQuestion>(
        "Question",
        questionSchema
    );
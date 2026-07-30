import mongoose from "mongoose";

export type QuestionDifficulty =
    | "easy"
    | "medium"
    | "hard";

export type QuestionType =
    | "mcq"
    | "multiple-select";

export type QuestionOption = {
    id: string;
    text: string;
};

export type CreateQuestionInput = {
    lessonId: mongoose.Types.ObjectId;

    question: string;

    type: QuestionType;

    options: QuestionOption[];

    correctOptionIds: string[];

    explanation: string;

    difficulty: QuestionDifficulty;

    marks: number;

    order: number;
};

export type UpdateQuestionInput =
    Partial<Omit<CreateQuestionInput, "lessonId">>;

export type QuestionResponse = {
    id: mongoose.Types.ObjectId;

    lessonId: mongoose.Types.ObjectId;

    question: string;

    type: QuestionType;

    options: QuestionOption[];

    correctOptionIds: string[];

    explanation: string;

    difficulty: QuestionDifficulty;

    marks: number;

    order: number;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
};

export type QuestionQuery = {
    lessonId?: mongoose.Types.ObjectId;

    difficulty?: QuestionDifficulty;

    isPublished?: boolean;

    page?: number;

    limit?: number;
};

export type PublishQuestionInput = {
    questionId: mongoose.Types.ObjectId;
    isPublished: boolean;
};
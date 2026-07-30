import mongoose from "mongoose";

export type CreateLessonInput = {
    title: string;
    description: string;

    moduleId: mongoose.Types.ObjectId;

    content: string;

    videoUrl?: string;

    durationInSeconds: number;

    order: number;

    isPreview?: boolean;
};

export type UpdateLessonInput = Partial<Omit<CreateLessonInput, "moduleId">>;

export type LessonResponse = {
    id: mongoose.Types.ObjectId;

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
};

export type LessonQuery = {
    moduleId?: mongoose.Types.ObjectId;

    search?: string;

    isPublished?: boolean;

    isPreview?: boolean;

    page?: number;

    limit?: number;
};

export type PublishLessonInput = {
    lessonId: mongoose.Types.ObjectId;
    isPublished: boolean;
};
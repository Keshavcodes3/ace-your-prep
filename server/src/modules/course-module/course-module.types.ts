import mongoose from "mongoose";

export type CreateModuleInput = {
    title: string;
    description: string;

    courseId: mongoose.Types.ObjectId;

    order: number;
};

export type UpdateModuleInput =
    Partial<Omit<CreateModuleInput, "courseId">>;

export type ModuleResponse = {
    id: mongoose.Types.ObjectId;

    title: string;
    description: string;

    courseId: mongoose.Types.ObjectId;

    order: number;

    totalLessons: number;

    isPublished: boolean;

    createdAt: Date;
    updatedAt: Date;
};

export type ModuleQuery = {
    courseId?: mongoose.Types.ObjectId;

    search?: string;

    isPublished?: boolean;

    page?: number;

    limit?: number;
};

export type PublishModuleInput = {
    moduleId: mongoose.Types.ObjectId;
    isPublished: boolean;
};
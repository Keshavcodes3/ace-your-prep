import { LessonModel, type ILesson } from "./lessons.model.js";
import type {
    CreateLessonInput,
    UpdateLessonInput,
} from "./lessons.types.js";
import mongoose from "mongoose";

class LessonRepository {

    async createLesson(
        data: CreateLessonInput
    ): Promise<ILesson> {
        return LessonModel.create(data);
    }


    async findById(
        id: mongoose.Types.ObjectId
    ): Promise<ILesson | null> {
        return LessonModel.findById(id);
    }


    async findByModuleId(
        moduleId: mongoose.Types.ObjectId
    ): Promise<ILesson[]> {
        return LessonModel
            .find({ moduleId })
            .sort({ order: 1 });
    }


    async findPublishedLessons(
        moduleId: mongoose.Types.ObjectId
    ): Promise<ILesson[]> {
        return LessonModel
            .find({
                moduleId,
                isPublished: true,
            })
            .sort({ order: 1 });
    }


    async updateLesson(
        id: mongoose.Types.ObjectId,
        data: UpdateLessonInput
    ): Promise<ILesson | null> {
        return LessonModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }


    async deleteLesson(
        id: mongoose.Types.ObjectId
    ): Promise<ILesson | null> {
        return LessonModel.findByIdAndDelete(id);
    }


    async publishLesson(
        id: mongoose.Types.ObjectId
    ): Promise<ILesson | null> {
        return LessonModel.findByIdAndUpdate(
            id,
            {
                isPublished: true,
            },
            {
                new: true,
            }
        );
    }


    async existsByTitle(
        moduleId: mongoose.Types.ObjectId,
        title: string
    ): Promise<boolean> {

        const exists =
            await LessonModel.exists({
                moduleId,
                title,
            });

        return !!exists;
    }


    async existsByOrder(
        moduleId: mongoose.Types.ObjectId,
        order: number
    ): Promise<boolean> {

        const exists =
            await LessonModel.exists({
                moduleId,
                order,
            });

        return !!exists;
    }


    async countLessons(
        moduleId: mongoose.Types.ObjectId
    ): Promise<number> {

        return LessonModel.countDocuments({
            moduleId,
        });
    }

}

export const lessonRepository =
    new LessonRepository();
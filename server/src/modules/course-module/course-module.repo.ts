import { CourseModuleModel, type ICourseModule } from "./course-module.model.js";
import type {
    CreateModuleInput,
    UpdateModuleInput,
} from "./course-module.types.js";
import mongoose from "mongoose";

class CourseModuleRepository {
    async createModule(
        data: CreateModuleInput
    ): Promise<ICourseModule> {
        return CourseModuleModel.create(data);
    }

    async findById(
        id: mongoose.Types.ObjectId
    ): Promise<ICourseModule | null> {
        return CourseModuleModel.findById(id);
    }

    async findByCourseId(
        courseId: mongoose.Types.ObjectId
    ): Promise<ICourseModule[]> {
        return CourseModuleModel.find({ courseId }).sort({
            order: 1,
        });
    }

    async findPublishedModules(
        courseId: mongoose.Types.ObjectId
    ): Promise<ICourseModule[]> {
        return CourseModuleModel.find({
            courseId,
            isPublished: true,
        }).sort({
            order: 1,
        });
    }

    async updateModule(
        id: mongoose.Types.ObjectId,
        data: UpdateModuleInput
    ): Promise<ICourseModule | null> {
        return CourseModuleModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async deleteModule(
        id: mongoose.Types.ObjectId
    ): Promise<ICourseModule | null> {
        return CourseModuleModel.findByIdAndDelete(id);
    }

    async publishModule(
        id: mongoose.Types.ObjectId
    ): Promise<ICourseModule | null> {
        return CourseModuleModel.findByIdAndUpdate(
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
        courseId: mongoose.Types.ObjectId,
        title: string
    ): Promise<boolean> {
        const exists = await CourseModuleModel.exists({
            courseId,
            title,
        });

        return !!exists;
    }

    async existsByOrder(
        courseId: mongoose.Types.ObjectId,
        order: number
    ): Promise<boolean> {
        const exists = await CourseModuleModel.exists({
            courseId,
            order,
        });

        return !!exists;
    }

    async incrementLessonCount(
        id: mongoose.Types.ObjectId
    ) {
        return CourseModuleModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    totalLessons: 1,
                },
            }
        );
    }
}

export const courseModuleRepository =
    new CourseModuleRepository();
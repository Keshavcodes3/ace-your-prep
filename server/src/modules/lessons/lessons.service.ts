import { ApiError } from "@/middlewares/apiError.js";
import { lessonRepository } from "./lessons.repository.js";
import { courseModuleRepository } from "../course-module/course-module.repo.js";

import type {
    CreateLessonInput,
    UpdateLessonInput,
} from "./lessons.types.js";
import mongoose from "mongoose";

class LessonService {

    async createLesson(
        data: CreateLessonInput
    ) {

        const module =
            await courseModuleRepository.findById(
                data.moduleId
            );

        if (!module) {
            throw new ApiError(
                "Module not found",
                404,
                "MODULE_NOT_FOUND"
            );
        }


        const titleExists =
            await lessonRepository.existsByTitle(
                data.moduleId,
                data.title
            );

        if (titleExists) {
            throw new ApiError(
                "Lesson already exists",
                409,
                "LESSON_ALREADY_EXISTS"
            );
        }


        const orderExists =
            await lessonRepository.existsByOrder(
                data.moduleId,
                data.order
            );

        if (orderExists) {
            throw new ApiError(
                "Lesson order already exists",
                409,
                "LESSON_ORDER_ALREADY_EXISTS"
            );
        }


        const lesson =
            await lessonRepository.createLesson(
                data
            );


        await courseModuleRepository.incrementLessonCount(
            data.moduleId
        );


        return lesson;
    }



    async getLessonById(
        id: mongoose.Types.ObjectId
    ) {

        const lesson =
            await lessonRepository.findById(id);

        if (!lesson) {
            throw new ApiError(
                "Lesson not found",
                404,
                "LESSON_NOT_FOUND"
            );
        }

        return lesson;
    }



    async getLessonsByModule(
        moduleId: mongoose.Types.ObjectId
    ) {

        return lessonRepository.findByModuleId(
            moduleId
        );
    }



    async getPublishedLessons(
        moduleId: mongoose.Types.ObjectId
    ) {

        return lessonRepository.findPublishedLessons(
            moduleId
        );
    }



    async updateLesson(
        id: mongoose.Types.ObjectId,
        data: UpdateLessonInput
    ) {

        const lesson =
            await lessonRepository.updateLesson(
                id,
                data
            );

        if (!lesson) {
            throw new ApiError(
                "Lesson not found",
                404,
                "LESSON_NOT_FOUND"
            );
        }

        return lesson;
    }



    async publishLesson(
        id: mongoose.Types.ObjectId
    ) {

        const lesson =
            await lessonRepository.publishLesson(
                id
            );

        if (!lesson) {
            throw new ApiError(
                "Lesson not found",
                404,
                "LESSON_NOT_FOUND"
            );
        }

        return lesson;
    }



    async deleteLesson(
        id: mongoose.Types.ObjectId
    ) {

        const lesson =
            await lessonRepository.deleteLesson(
                id
            );

        if (!lesson) {
            throw new ApiError(
                "Lesson not found",
                404,
                "LESSON_NOT_FOUND"
            );
        }

        return lesson;
    }

}

export const lessonService =
    new LessonService();
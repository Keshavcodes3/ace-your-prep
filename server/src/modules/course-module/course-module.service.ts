import { ApiError } from "@/middlewares/apiError.js";
import { courseRepository } from "../courses/courses.repository.js";
import { courseModuleRepository } from "./course-module.repo.js";
import type {
    CreateModuleInput,
    UpdateModuleInput,
} from "./course-module.types.js";
import mongoose from "mongoose";

class CourseModuleService {

    async createModule(
        data: CreateModuleInput
    ) {

        const course = await courseRepository.findById(
            data.courseId
        );

        if (!course) {
            throw new ApiError(
                "Course not found",
                404,
                "COURSE_NOT_FOUND"
            );
        }


        const titleExists =
            await courseModuleRepository.existsByTitle(
                data.courseId,
                data.title
            );

        if (titleExists) {
            throw new ApiError(
                "Module already exists",
                409,
                "MODULE_EXISTS"
            );
        }


        const orderExists =
            await courseModuleRepository.existsByOrder(
                data.courseId,
                data.order
            );

        if (orderExists) {
            throw new ApiError(
                "Module order already exists",
                409,
                "MODULE_ORDER_EXISTS"
            );
        }


        const module =
            await courseModuleRepository.createModule(
                data
            );


        await courseRepository.incrementModuleCount(
            data.courseId
        );


        return module;
    }



    async getModuleById(
        id: mongoose.Types.ObjectId
    ) {

        const module =
            await courseModuleRepository.findById(id);

        if (!module) {
            throw new ApiError(
                "Module not found",
                404,
                "MODULE_NOT_FOUND"
            );
        }

        return module;
    }



    async getModulesByCourse(
        courseId: mongoose.Types.ObjectId
    ) {

        return courseModuleRepository.findByCourseId(
            courseId
        );
    }



    async getPublishedModules(
        courseId: mongoose.Types.ObjectId
    ) {

        return courseModuleRepository.findPublishedModules(
            courseId
        );
    }



    async updateModule(
        id: mongoose.Types.ObjectId,
        data: UpdateModuleInput
    ) {

        const module =
            await courseModuleRepository.updateModule(
                id,
                data
            );

        if (!module) {
            throw new ApiError(
                "Module not found",
                404,
                "MODULE_NOT_FOUND"
            );
        }

        return module;
    }



    async publishModule(
        id: mongoose.Types.ObjectId
    ) {

        const module =
            await courseModuleRepository.publishModule(
                id
            );

        if (!module) {
            throw new ApiError(
                "Module not found",
                404,
                "MODULE_NOT_FOUND"
            );
        }

        return module;
    }



    async deleteModule(
        id: mongoose.Types.ObjectId
    ) {

        const module =
            await courseModuleRepository.deleteModule(
                id
            );

        if (!module) {
            throw new ApiError(
                "Module not found",
                404,
                "MODULE_NOT_FOUND"
            );
        }

        return module;
    }

}

export const courseModuleService =
    new CourseModuleService();
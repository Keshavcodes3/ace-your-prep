import mongoose from "mongoose";
import { courseRepository } from "./courses.repository.js";
import type {
    CreateCourseInput,
    UpdateCourseInput,
} from "./courses.types.js";
import { ApiError } from "@/middlewares/apiError.js";


class CourseService {

    async createCourse(
        data: CreateCourseInput,
        instructorId: string
    ) {

        const slug = data.title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-");


        const exists =
            await courseRepository.existsBySlug(slug);


        if (exists) {
            throw new ApiError(
                "Course already exists",
                409,
                "COURSE_EXISTS"
            );
        }

        if (!mongoose.Types.ObjectId.isValid(instructorId)) {
            throw new ApiError(
                "Invalid instructor ID",
                400,
                "INVALID_INSTRUCTOR_ID"
            );
        }

        try {
            const course =
                await courseRepository.createCourse({
                    ...data,
                    slug,
                    instructor: new mongoose.Types.ObjectId(instructorId),
                });
            return course;
        } catch (error) {
            console.error("Error creating course:", error);
            throw new ApiError(
                "Failed to create course",
                500,
                "COURSE_CREATION_FAILED"
            );
        }
    }



    async getCourseById(
        id: string
    ) {
        try {
            const course =
                await courseRepository.findById(id);


            if (!course) {
                throw new ApiError(
                    "Course not found",
                    404,
                    "COURSE_NOT_FOUND"
                );
            }

            return course;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(
                    "Invalid course ID",
                    400,
                    "INVALID_COURSE_ID"
                );
            }
            throw error;
        }
    }



    async getCourseBySlug(
        slug: string
    ) {

        const course =
            await courseRepository.findBySlug(slug);


        if (!course) {
            throw new ApiError(
                "Course not found",
                404,
                "COURSE_NOT_FOUND"
            );
        }


        return course;
    }



    async getAllCourses() {

        return courseRepository.findAll();

    }



    async getPublishedCourses() {

        return courseRepository
            .findPublishedCourses();

    }



    async updateCourse(
        id: string,
        data: UpdateCourseInput
    ) {
        try {
            const course =
                await courseRepository.updateCourse(
                    id,
                    data
                );


            if (!course) {
                throw new ApiError(
                    "Course not found",
                    404,
                    "COURSE_NOT_FOUND"
                );
            }

            return course;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(
                    "Invalid course ID",
                    400,
                    "INVALID_COURSE_ID"
                );
            }
            throw error;
        }
    }



    async publishCourse(
        id: string
    ) {
        try {
            const course =
                await courseRepository.updateCourse(
                    id,
                    {
                        isPublished: true,
                    }
                );


            if (!course) {
                throw new ApiError(
                    "Course not found",
                    404,
                    "COURSE_NOT_FOUND"
                );
            }

            return course;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(
                    "Invalid course ID",
                    400,
                    "INVALID_COURSE_ID"
                );
            }
            throw error;
        }
    }



    async deleteCourse(
        id: string
    ) {
        try {
            const course =
                await courseRepository.deleteCourse(id);


            if (!course) {
                throw new ApiError(
                    "Course not found",
                    404,
                    "COURSE_NOT_FOUND"
                );
            }

            return course;
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                throw new ApiError(
                    "Invalid course ID",
                    400,
                    "INVALID_COURSE_ID"
                );
            }
            throw error;
        }
    }

}


export const courseService =
    new CourseService();
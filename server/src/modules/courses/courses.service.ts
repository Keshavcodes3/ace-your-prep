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


        const course =
            await courseRepository.createCourse({
                ...data,
                slug,
                instructor: instructorId,
            });


        return course;
    }



    async getCourseById(
        id: string
    ) {

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
    }



    async publishCourse(
        id: string
    ) {

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
    }



    async deleteCourse(
        id: string
    ) {

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
    }

}


export const courseService =
    new CourseService();
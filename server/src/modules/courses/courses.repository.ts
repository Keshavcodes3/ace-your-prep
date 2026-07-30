import type { Types } from "mongoose";
import { CourseModel, type ICourse } from "./courses.model.js";
import type { CreateCourseInput, UpdateCourseInput } from "./courses.types.js";


class CourseRepository {

    async createCourse(
        data: CreateCourseInput & {
            instructor: Types.ObjectId;
            slug: string;
        }
    ): Promise<ICourse> {
        const course = await CourseModel.create(data);
        return course;
    }


    async findById(
        id: string
    ): Promise<ICourse | null> {
        const course = await CourseModel.findById(id);

        return course;
    }


    async findBySlug(
        slug: string
    ): Promise<ICourse | null> {
        const course = await CourseModel.findOne({
            slug,
        });

        return course;
    }


    async findAll(
        filter = {}
    ): Promise<ICourse[]> {
        const courses = await CourseModel.find(filter)
            .sort({
                createdAt: -1,
            });

        return courses;
    }


    async findPublishedCourses(): Promise<ICourse[]> {
        const courses = await CourseModel.find({
            isPublished: true,
        })
            .sort({
                createdAt: -1,
            });

        return courses;
    }


    async updateCourse(
        id: string,
        data: UpdateCourseInput
    ): Promise<ICourse | null> {

        const course = await CourseModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        return course;
    }


    async deleteCourse(
        id: string
    ): Promise<ICourse | null> {

        const course = await CourseModel.findByIdAndDelete(
            id
        );

        return course;
    }


    async existsBySlug(
        slug: string
    ): Promise<boolean> {

        const course = await CourseModel.exists({
            slug,
        });

        return !!course;
    }


    async incrementModuleCount(
        id: string
    ) {
        return CourseModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    totalModules: 1,
                },
            }
        );
    }


    async incrementLessonCount(
        id: string
    ) {
        return CourseModel.findByIdAndUpdate(
            id,
            {
                $inc: {
                    totalLessons: 1,
                },
            }
        );
    }
}


export const courseRepository =
    new CourseRepository();
import { type Request, type Response } from "express";
import { courseService } from "./courses.service.js";
import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { ApiResponse } from "@/middlewares/apiResponse.js";

class CourseController {


    createCourse = asyncHandler(
        async (req: Request, res: Response) => {

            const course =
                await courseService.createCourse(
                    req.body,
                    (req as any).user.userId
                );


            return res
                .status(201)
                .json(
                    new ApiResponse(
                        course,
                        "Course created successfully"
                    )
                );
        }
    );



    getCourse = asyncHandler(
        async (req: Request, res: Response) => {

            const course =
                await courseService.getCourseById(
                    req.params.id as string
                );


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        course,
                        "Course fetched successfully"
                    )
                );
        }
    );



    getCourseBySlug = asyncHandler(
        async (req: Request, res: Response) => {

            const course =
                await courseService.getCourseBySlug(
                    req.params.slug as string
                );


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        course,
                        "Course fetched successfully"
                    )
                );
        }
    );



    getCourses = asyncHandler(
        async (_req: Request, res: Response) => {

            const courses =
                await courseService.getAllCourses();


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        courses,
                        "Courses fetched successfully"
                    )
                );
        }
    );



    getPublishedCourses = asyncHandler(
        async (_req: Request, res: Response) => {

            const courses =
                await courseService
                    .getPublishedCourses();


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        courses,
                        "Published courses fetched successfully"
                    )
                );
        }
    );



    updateCourse = asyncHandler(
        async (req: Request, res: Response) => {

            const course =
                await courseService.updateCourse(
                    req.params.id as string,
                    req.body
                );


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        course,
                        "Course updated successfully"
                    )
                );
        }
    );



    publishCourse = asyncHandler(
        async (req: Request, res: Response) => {

            const course =
                await courseService.publishCourse(
                    req.params.id as string
                );


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        course,
                        "Course published successfully"
                    )
                );
        }
    );



    deleteCourse = asyncHandler(
        async (req: Request, res: Response) => {

            await courseService.deleteCourse(
                req.params.id as string
            );


            return res
                .status(200)
                .json(
                    new ApiResponse(
                        null,
                        "Course deleted successfully"
                    )
                );
        }
    );

}


export const courseController =
    new CourseController();
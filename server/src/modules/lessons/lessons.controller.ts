import type { Request, Response } from "express";

import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { ApiResponse as apiResponse } from "@/middlewares/apiResponse.js";

import { lessonService } from "./lessons.service.js";
import mongoose from "mongoose";

class LessonController {

    createLesson = asyncHandler(async (req: Request, res: Response) => {

        const lesson = await lessonService.createLesson(req.body);

        return res.status(201).json(
            new apiResponse(
                lesson,
                "Lesson created successfully"
            )
        );
    });

    getLessonById = asyncHandler(async (req: Request, res: Response) => {

        const lesson = await lessonService.getLessonById(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                lesson,
                "Lesson fetched successfully"
            )
        );
    });

    getLessonsByModule = asyncHandler(async (req: Request, res: Response) => {

        const lessons = await lessonService.getLessonsByModule(
            new mongoose.Types.ObjectId(req.params.moduleId)
        );

        return res.status(200).json(
            new apiResponse(
                lessons,
                "Lessons fetched successfully"
            )
        );
    });

    getPublishedLessons = asyncHandler(async (req: Request, res: Response) => {

        const lessons = await lessonService.getPublishedLessons(
            new mongoose.Types.ObjectId(req.params.moduleId)
        );

        return res.status(200).json(
            new apiResponse(
                lessons,
                "Published lessons fetched successfully"
            )
        );
    });

    updateLesson = asyncHandler(async (req: Request, res: Response) => {

        const lesson = await lessonService.updateLesson(
            new mongoose.Types.ObjectId(req.params.id),
            req.body
        );

        return res.status(200).json(
            new apiResponse(
                lesson,
                "Lesson updated successfully"
            )
        );
    });

    publishLesson = asyncHandler(async (req: Request, res: Response) => {

        const lesson = await lessonService.publishLesson(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                lesson,
                "Lesson published successfully"
            )
        );
    });

    deleteLesson = asyncHandler(async (req: Request, res: Response) => {

        await lessonService.deleteLesson(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                null,
                "Lesson deleted successfully"
            )
        );
    });

}

export const lessonController = new LessonController();
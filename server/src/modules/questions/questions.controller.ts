import type { Request, Response } from "express";

import { asyncHandler } from "@/middlewares/asyncHandler.js";
import { ApiResponse as apiResponse } from "@/middlewares/apiResponse.js";
import { questionService } from "./questions.service.js";
import mongoose from "mongoose";

class QuestionController {

    createQuestion = asyncHandler(async (req: Request, res: Response) => {

        const question = await questionService.createQuestion(
            req.body
        );

        return res.status(201).json(
            new apiResponse(
                question,
                "Question created successfully"
            )
        );
    });

    getQuestionById = asyncHandler(async (req: Request, res: Response) => {

        const question = await questionService.getQuestionById(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                question,
                "Question fetched successfully"
            )
        );
    });

    getQuestionsByLesson = asyncHandler(async (req: Request, res: Response) => {

        const questions = await questionService.getQuestionsByLesson(
            new mongoose.Types.ObjectId(req.params.lessonId)
        );

        return res.status(200).json(
            new apiResponse(
                questions,
                "Questions fetched successfully"
            )
        );
    });

    getPublishedQuestions = asyncHandler(async (req: Request, res: Response) => {

        const questions = await questionService.getPublishedQuestions(
            new mongoose.Types.ObjectId(req.params.lessonId)
        );

        return res.status(200).json(
            new apiResponse(
                questions,
                "Published questions fetched successfully"
            )
        );
    });

    updateQuestion = asyncHandler(async (req: Request, res: Response) => {

        const question = await questionService.updateQuestion(
            new mongoose.Types.ObjectId(req.params.id),
            req.body
        );

        return res.status(200).json(
            new apiResponse(
                question,
                "Question updated successfully"
            )
        );
    });

    publishQuestion = asyncHandler(async (req: Request, res: Response) => {

        const question = await questionService.publishQuestion(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                question,
                "Question published successfully"
            )
        );
    });

    deleteQuestion = asyncHandler(async (req: Request, res: Response) => {

        await questionService.deleteQuestion(
            new mongoose.Types.ObjectId(req.params.id)
        );

        return res.status(200).json(
            new apiResponse(
                null,
                "Question deleted successfully"
            )
        );
    });

}

export const questionController = new QuestionController();
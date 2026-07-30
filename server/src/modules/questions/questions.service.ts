import { ApiError } from "@/middlewares/apiError.js";

import { lessonRepository } from "../lessons/lessons.repository.js";
import { questionRepository } from "./questions.repository.js";
import type {
    CreateQuestionInput,
    UpdateQuestionInput,
} from "./questions.types.js";
import mongoose from "mongoose";

class QuestionService {

    async createQuestion(
        data: CreateQuestionInput
    ) {

        const lesson = await lessonRepository.findById(
            data.lessonId
        );

        if (!lesson) {
            throw new ApiError(
                "Lesson not found",
                404,
                "LESSON_NOT_FOUND"
            );
        }

        if (data.options.length < 2) {
            throw new ApiError(
                "Question must contain at least 2 options",
                400,
                "INVALID_OPTIONS"
            );
        }

        if (data.options.length > 6) {
            throw new ApiError(
                "Question can contain at most 6 options",
                400,
                "INVALID_OPTIONS"
            );
        }

        const optionIds = new Set(
            data.options.map(option => option.id)
        );

        if (optionIds.size !== data.options.length) {
            throw new ApiError(
                "Duplicate option ids found",
                400,
                "DUPLICATE_OPTION_IDS"
            );
        }

        const optionTexts = new Set(
            data.options.map(option => option.text)
        );

        if (optionTexts.size !== data.options.length) {
            throw new ApiError(
                "Duplicate option text found",
                400,
                "DUPLICATE_OPTION_TEXT"
            );
        }

        for (const id of data.correctOptionIds) {
            if (!optionIds.has(id)) {
                throw new ApiError(
                    "Correct option does not exist",
                    400,
                    "INVALID_CORRECT_OPTION"
                );
            }
        }

        if (
            data.type === "mcq" &&
            data.correctOptionIds.length !== 1
        ) {
            throw new ApiError(
                "MCQ must have exactly one correct answer",
                400,
                "INVALID_CORRECT_OPTION"
            );
        }

        if (
            data.type === "multiple-select" &&
            data.correctOptionIds.length < 1
        ) {
            throw new ApiError(
                "Multiple select must have at least one correct answer",
                400,
                "INVALID_CORRECT_OPTION"
            );
        }

        const orderExists =
            await questionRepository.existsByOrder(
                data.lessonId,
                data.order
            );

        if (orderExists) {
            throw new ApiError(
                "Question order already exists",
                409,
                "QUESTION_ORDER_EXISTS"
            );
        }

        return questionRepository.createQuestion(
            data
        );
    }

    async getQuestionById(
        id: mongoose.Types.ObjectId
    ) {

        const question =
            await questionRepository.findById(id);

        if (!question) {
            throw new ApiError(
                "Question not found",
                404,
                "QUESTION_NOT_FOUND"
            );
        }

        return question;
    }

    async getQuestionsByLesson(
        lessonId: mongoose.Types.ObjectId
    ) {

        return questionRepository.findByLessonId(
            lessonId
        );
    }

    async getPublishedQuestions(
        lessonId: mongoose.Types.ObjectId
    ) {

        return questionRepository.findPublishedQuestions(
            lessonId
        );
    }

    async updateQuestion(
        id: mongoose.Types.ObjectId,
        data: UpdateQuestionInput
    ) {

        const question =
            await questionRepository.updateQuestion(
                id,
                data
            );

        if (!question) {
            throw new ApiError(
                "Question not found",
                404,
                "QUESTION_NOT_FOUND"
            );
        }

        return question;
    }

    async publishQuestion(
        id: mongoose.Types.ObjectId
    ) {

        const question =
            await questionRepository.publishQuestion(
                id
            );

        if (!question) {
            throw new ApiError(
                "Question not found",
                404,
                "QUESTION_NOT_FOUND"
            );
        }

        return question;
    }

    async deleteQuestion(
        id: mongoose.Types.ObjectId
    ) {

        const question =
            await questionRepository.deleteQuestion(
                id
            );

        if (!question) {
            throw new ApiError(
                "Question not found",
                404,
                "QUESTION_NOT_FOUND"
            );
        }

        return question;
    }

}

export const questionService =
    new QuestionService();
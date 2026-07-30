import { QuestionModel, type IQuestion } from "./questions.model.js"
import type {
    CreateQuestionInput,
    UpdateQuestionInput,
} from "./questions.types.js";
import mongoose from "mongoose";

class QuestionRepository {

    async createQuestion(
        data: CreateQuestionInput
    ): Promise<IQuestion> {
        return QuestionModel.create(data);
    }

    async findById(
        id: mongoose.Types.ObjectId
    ): Promise<IQuestion | null> {
        return QuestionModel.findById(id);
    }

    async findByLessonId(
        lessonId: mongoose.Types.ObjectId
    ): Promise<IQuestion[]> {
        return QuestionModel
            .find({ lessonId })
            .sort({ order: 1 });
    }

    async findPublishedQuestions(
        lessonId: mongoose.Types.ObjectId
    ): Promise<IQuestion[]> {
        return QuestionModel
            .find({
                lessonId,
                isPublished: true,
            })
            .sort({ order: 1 });
    }

    async updateQuestion(
        id: mongoose.Types.ObjectId,
        data: UpdateQuestionInput
    ): Promise<IQuestion | null> {
        return QuestionModel.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true,
            }
        );
    }

    async deleteQuestion(
        id: mongoose.Types.ObjectId
    ): Promise<IQuestion | null> {
        return QuestionModel.findByIdAndDelete(id);
    }

    async publishQuestion(
        id: mongoose.Types.ObjectId
    ): Promise<IQuestion | null> {
        return QuestionModel.findByIdAndUpdate(
            id,
            {
                isPublished: true,
            },
            {
                new: true,
            }
        );
    }

    async existsByOrder(
        lessonId: mongoose.Types.ObjectId,
        order: number
    ): Promise<boolean> {

        const exists = await QuestionModel.exists({
            lessonId,
            order,
        });

        return !!exists;
    }

    async countQuestions(
        lessonId: mongoose.Types.ObjectId
    ): Promise<number> {

        return QuestionModel.countDocuments({
            lessonId,
        });
    }

    async searchQuestions(
        query: string
    ): Promise<IQuestion[]> {

        return QuestionModel.find({
            $text: {
                $search: query,
            },
        });
    }

    async getByDifficulty(
        lessonId: mongoose.Types.ObjectId,
        difficulty: "easy" | "medium" | "hard"
    ): Promise<IQuestion[]> {

        return QuestionModel.find({
            lessonId,
            difficulty,
        }).sort({
            order: 1,
        });
    }

    async getQuestionForAttempt(
        id: mongoose.Types.ObjectId
    ): Promise<IQuestion | null> {

        return QuestionModel.findById(id).lean();
    }

}

export const questionRepository =
    new QuestionRepository();
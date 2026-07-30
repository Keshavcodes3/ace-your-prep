import { Router } from "express";

import { questionController } from "./questions.controller.js";

import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { authorize } from "@/middlewares/authorize.js";
const router = Router();

/**
 * Public Routes
 */

// Get question by ID
router.get(
    "/:id",
    questionController.getQuestionById
);

// Get all questions of a lesson
router.get(
    "/lesson/:lessonId",
    questionController.getQuestionsByLesson
);

// Get published questions of a lesson
router.get(
    "/lesson/:lessonId/published",
    questionController.getPublishedQuestions
);

/**
 * Protected Routes
 */

// Create question
router.post(
    "/",
    authMiddleware,
    authorize("admin", "instructor"),
    questionController.createQuestion
);

// Update question
router.patch(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    questionController.updateQuestion
);

// Publish question
router.patch(
    "/:id/publish",
    authMiddleware,
    authorize("admin", "instructor"),
    questionController.publishQuestion
);

// Delete question
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    questionController.deleteQuestion
);

export default router;
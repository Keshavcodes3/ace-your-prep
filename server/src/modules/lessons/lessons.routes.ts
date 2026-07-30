import { Router } from "express";

import { lessonController } from "./lessons.controller.js";

import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { authorize } from "@/middlewares/authorize.js";

const router = Router();

/**
 * Public Routes
 */

// Get lesson by ID
router.get(
    "/:id",
    lessonController.getLessonById
);

// Get all lessons of a module
router.get(
    "/module/:moduleId",
    lessonController.getLessonsByModule
);

// Get published lessons of a module
router.get(
    "/module/:moduleId/published",
    lessonController.getPublishedLessons
);

/**
 * Protected Routes
 */

// Create lesson
router.post(
    "/",
    authMiddleware,
    authorize("admin", "instructor"),
    lessonController.createLesson
);

// Update lesson
router.patch(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    lessonController.updateLesson
);

// Publish lesson
router.patch(
    "/:id/publish",
    authMiddleware,
    authorize("admin", "instructor"),
    lessonController.publishLesson
);

// Delete lesson
router.delete(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    lessonController.deleteLesson
);

export default router;
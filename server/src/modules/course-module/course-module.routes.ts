import { Router } from "express";
import { courseModuleController } from "./course-module.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { authorize } from "@/middlewares/authorize.js";
const router = Router();

/**
 * Public Routes
 */

// Get a module by ID
router.get(
    "/:id",
    courseModuleController.getModule
);

// Get all modules of a course
router.get(
    "/course/:courseId",
    authMiddleware,
    courseModuleController.getModulesByCourse
);

// Get published modules of a course
router.get(
    "/course/:courseId/published",
    courseModuleController.getPublishedModules
);


/**
 * Protected Routes
 */

router.post(
    "/",
    authMiddleware,
    authorize("admin", "instructor"),
    courseModuleController.createModule
);

router.patch(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    courseModuleController.updateModule
);

router.patch(
    "/:id/publish",
    authMiddleware,
    authorize("admin", "instructor"),
    courseModuleController.publishModule
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("admin", "instructor"),
    courseModuleController.deleteModule
);

export default router;
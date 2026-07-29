import { Router } from "express";
import { courseController } from "./courses.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";


const router = Router();


// Public routes

router.get(
    "/",
    courseController.getCourses
);


router.get(
    "/published",
    courseController.getPublishedCourses
);


router.get(
    "/slug/:slug",
    courseController.getCourseBySlug
);


router.get(
    "/:id",
    courseController.getCourse
);




router.post(
    "/",
    authMiddleware,
    courseController.createCourse
);


router.patch(
    "/:id",
    authMiddleware,
    courseController.updateCourse
);


router.patch(
    "/:id/publish",
    authMiddleware,
    courseController.publishCourse
);


router.delete(
    "/:id",
    authMiddleware,
    courseController.deleteCourse
);


export default router;
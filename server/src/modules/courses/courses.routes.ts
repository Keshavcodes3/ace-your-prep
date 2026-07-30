import { Router } from "express";
import { courseController } from "./courses.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { authorize } from "@/middlewares/authorize.js";


const router = Router();


// Public routes

router.get(
    "/",
    authMiddleware,
    courseController.getCourses
);


router.get(
    "/published",
    authMiddleware,
    courseController.getPublishedCourses
);


router.get(
    "/slug/:slug",
    authMiddleware,
    courseController.getCourseBySlug
);


router.get(
    "/:id",
    authMiddleware,
    courseController.getCourse
);




router.post(
    "/",
    authMiddleware,
    authorize("admin"),
    courseController.createCourse
);


router.patch(
    "/:id",
    authMiddleware,
    authorize("admin"),
    courseController.updateCourse
);


router.patch(
    "/:id/publish",

    authMiddleware,
    authorize("admin"),
    courseController.publishCourse
);


router.delete(
    "/:id",
    authMiddleware,
    authorize("admin"),
    courseController.deleteCourse
);


export default router;
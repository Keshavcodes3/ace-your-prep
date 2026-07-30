import { asyncHandler } from "@/middlewares/asyncHandler.js";
import type { Request, Response } from "express";
import { ApiResponse as apiResponse } from "@/middlewares/apiResponse.js";
import { courseModuleService } from "./course-module.service.js";
import mongoose from "mongoose";

class CourseModuleController {

    createModule = asyncHandler(
        async (req: Request, res: Response) => {

            const module =
                await courseModuleService.createModule(
                    req.body
                );

            return res.status(201).json(
                new apiResponse(
                    module,
                    "Module created successfully"
                )
            );
        }
    );



    getModule = asyncHandler(
        async (req: Request, res: Response) => {

            const module =
                await courseModuleService.getModuleById(
                    new mongoose.Types.ObjectId(req.params.id)
                );

            return res.status(200).json(
                new apiResponse(
                    module,
                    "Module fetched successfully"
                )
            );
        }
    );



    getModulesByCourse = asyncHandler(
        async (req: Request, res: Response) => {

            const modules =
                await courseModuleService.getModulesByCourse(
                    new mongoose.Types.ObjectId(req.params.courseId)
                );

            return res.status(200).json(
                new apiResponse(
                    modules,
                    "Modules fetched successfully"
                )
            );
        }
    );



    getPublishedModules = asyncHandler(
        async (req: Request, res: Response) => {

            const modules =
                await courseModuleService.getPublishedModules(
                    new mongoose.Types.ObjectId(req.params.courseId)
                );

            return res.status(200).json(
                new apiResponse(
                    modules,
                    "Published modules fetched successfully"
                )
            );
        }
    );



    updateModule = asyncHandler(
        async (req: Request, res: Response) => {

            const module =
                await courseModuleService.updateModule(
                    new mongoose.Types.ObjectId(req.params.id),
                    req.body
                );

            return res.status(200).json(
                new apiResponse(
                    module,
                    "Module updated successfully"
                )
            );
        }
    );



    publishModule = asyncHandler(
        async (req: Request, res: Response) => {

            const module =
                await courseModuleService.publishModule(
                    new mongoose.Types.ObjectId(req.params.id)
                );

            return res.status(200).json(
                new apiResponse(
                    module,
                    "Module published successfully"
                )
            );
        }
    );



    deleteModule = asyncHandler(
        async (req: Request, res: Response) => {

            await courseModuleService.deleteModule(
                new mongoose.Types.ObjectId(req.params.id)
            );

            return res.status(200).json(
                new apiResponse(
                    null,
                    "Module deleted successfully"
                )
            );
        }
    );

}

export const courseModuleController =
    new CourseModuleController();
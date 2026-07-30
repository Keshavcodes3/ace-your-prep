import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import authRouter from "@/modules/auth/auth.routes.js"
import courseRouter from "@/modules/courses/courses.routes.js"
import { ApiError } from "@/middlewares/apiError.js"
import moduleRouter from "@/modules/course-module/course-module.routes.js"


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/modules',moduleRouter)


app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err)
    }
    return res.status(500).json(new ApiError())
})


export default app
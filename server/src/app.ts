import express from "express"
import cookieParser from "cookie-parser"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

import authRouter from "@/modules/auth/auth.routes.js"


app.use('/api/v1/auth', authRouter)



export default app
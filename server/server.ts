import 'dotenv/config'

import { connectToDatabase } from "@/infrastructure/database/mongodb.js"
import app from "./src/app.js"

import { envConfig } from "@config/env.js"
import { redisConnection } from '@/infrastructure/Redis/connection.js'

connectToDatabase()
redisConnection
app.listen(envConfig.PORT, () => {
    console.log(`Server is listening at port ${envConfig.PORT}`)
})
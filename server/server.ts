import 'dotenv/config'

import { connectToDatabase } from "@/infrastructure/database/mongodb.js"
import app from "./src/app.js"

import { envConfig } from "@config/env.js"


connectToDatabase()

app.listen(envConfig.PORT, () => {
    console.log(`Server is listening at port ${envConfig.PORT}`)
})
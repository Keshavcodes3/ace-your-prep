import { Queue } from "bullmq"
import { redisConnection } from "../../Redis/connection.js"

export const emailQueue = new Queue("email-queue", {
    connection: redisConnection
})
import { Queue } from "bullmq"
import { redisConnection } from "../../Redis/connection.js"

const emailQueue = new Queue("email-queue", {
    connection: redisConnection
})
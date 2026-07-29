import { redisConnection } from "@/infrastructure/Redis/connection.js";
import { Worker } from "bullmq";
import { sendWelcomeEmail } from "@/config/email.js";
const worker = new Worker("email-queue", async (job) => {
    if (job.name === "email-queue") {
        await sendWelcomeEmail(job.data);
    }
}, {
    connection: redisConnection
})

export { worker as emailWorker }
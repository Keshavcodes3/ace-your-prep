import { redisConnection } from "@/infrastructure/Redis/connection.js";
import { Worker } from "bullmq";
import { sendWelcomeEmail } from "@/config/email.js";
const worker = new Worker("email", async (job) => {
    if (job.name === "welcome-email") {
        await sendWelcomeEmail(job.data);
    }
}, {
    connection: redisConnection
})

export { worker as emailWorker }
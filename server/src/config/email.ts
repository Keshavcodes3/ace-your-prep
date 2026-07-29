import { Resend } from "resend";
import { envConfig } from "@config/env.js";


const resend = new Resend(
    envConfig.RESEND_API_KEY
);


type WelcomeEmailData = {
    email: string;
    name: string;
};


export const sendWelcomeEmail = async (
    data: WelcomeEmailData
) => {
    const { email, name } = data;

    const { data: response, error } =
        await resend.emails.send({
            from: envConfig.MAIL_FROM,
            to: email,
            subject: "Welcome to Ace Your Prep 🚀",
            html: `
        <html>
          <body>
            <h1>Welcome ${name} 🎉</h1>

            <p>
              Thanks for joining Ace Your Prep.
            </p>

            <p>
              Your preparation journey starts now.
              Keep learning and keep improving 🚀
            </p>

            <br/>

            <p>
              Team Ace Your Prep
            </p>
          </body>
        </html>
      `,
        });


    if (error) {
        console.error(
            "Email sending failed:",
            error
        );

        throw new Error(
            "Unable to send welcome email"
        );
    }


    return response;
};
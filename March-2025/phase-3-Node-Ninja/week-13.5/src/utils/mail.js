import nodemailer from "nodemailer";
import Mailgen from "mailgen";

const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'MegaProject',
            link: 'https://mailgen.js/'
        }
    });

    var emailBody = mailGenerator.generate(options.mailGenContent);
    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    const mail = {
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: options.email,
        subject: options.subject,
        text: emailText, // plain‑text body
        html: emailBody, // HTML body
    }

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.log("Error sending email",error);
    }
}

const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our App! We're very excited to have you on board.",
            action: {
                instructions: 'To get started with our App, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
}

const forgotPasswordMailGenContent = (username, PasswordReseturl) => {
    return {
        body: {
            name: username,
            intro: "We are requested to forgot your password",
            action: {
                instructions: 'Please click button to continue:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset Password',
                    link: PasswordReseturl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
        }
    };
}
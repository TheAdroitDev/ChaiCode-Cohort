import { PrismaClient } from "@prisma/client";
import crypto from "crypto"
import bcryptjs from "bcryptjs"

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    // console.log('user registered!');

    // get user
    const { name, email, password, phone } = req.body;

    // validations
    if (!name || !email || !passwod || !phone) {
        console.log("Data is missing");
        res.status(400).json({
            message: "All fields are required",
            success: false
        })
    }

    try {
        // check existing user
        const existingUser = await prisma.user.findUnique({
            where: { email }
        })

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        // create verificationToken
        const verificationToken = crypto.randomBytes(32).toString("hex");

        // hashing
        const hashedPassword = bcryptjs.hash(password, 10);

        // create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone
            }
        })

        // send email
        // 1. create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOSTNAME,
            port: process.env.MAILTRAP_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.MAILTRAP_USERNAME,
                pass: process.env.MAILTRAP_PASSWORD,
            },
        });

        // 2. create mailoptions
        const mailOptions = {
            from: process.env.MAILTRAP_SENDEREMAIL,
            to: user.email,
            subject: "Password Reset Request",
            text: `Click the link below to Password Reset Request or copy and paste it into your browser: 
                    $${process.env.BASE_URL}/api/v1/users/verify/${token}`,
            html: `
                        <h2>Email Verification</h2>
                        <p>Click the button below to Password Reset Request:</p>
                        <a href="$${process.env.BASE_URL}/api/v1/users/verify/${token}" 
                           style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #007bff; 
                                  text-decoration: none; border-radius: 5px;">
                            Verify Email
                        </a>
                        <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                        <p><a href="$${process.env.BASE_URL}/api/v1/users/verify/${token}">
                            $${process.env.BASE_URL}/api/v1/users/verify/${token}
                        </a></p>
                    `,
        };


        // send email
        await transporter.sendMail(mailOptions);

        console.log('user registered!');

        // send successs status to user
        return res.status(201).json({
            message: "User registered successfully!",
            success: true
        })

    } catch (error) {
        console.log('registration failed!', error);
        return res.status(400).json({
            message: "registration failed!",
            error,
            success: false
        })
    }
}


export const login = async function (req, res) {

    // authenticated user validations
    const { name, email } = req.body;

    if(!name || !email){
        return res.status(400).json({
            message: "User not registered !",
            success: false
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if(!user){
            return res.status(201).json({
                message: "invalid email or password!",
                success: false
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Login failed!",
            success: false
        })
    }
}


import User from "../models/User.model.js"
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
    // get data
    const { name, email, password } = req.body

    // validate
    if (!name || !email || !password) {
        res.status(400).json({
            message: "All fields are required!",
            success: false
        })
    };

    // check if user already exists
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists!",
                success: false
            })
        }

        // create a user in database
        const user = await User.create({
            name,
            email,
            password
        });

        console.log(user);

        //if user not registered
        if (!user) {
            return res.status(400).json({
                message: "User not registered",
            });
        }

        // create a verification token
        const token = crypto.randomBytes(32).toString("hex")
        console.log('Token ', token);

        // save verification token in database
        user.verificationToken = token;

        // save the user
        await user.save()

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
            subject: "Verify Your email",
            text: `Please click or copy and paste the following link in the browser: ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
            // html: "<b>Hello world?</b>", // html body
        }

        // send email
        await transporter.sendMail(mailOptions);

        // send successs status to user
        res.status(201).json({
            message: "User registered successfully!",
            success: true
        })
    } catch (error) {
        // error handling
        res.status(500).json({
            message: "Internal Server Got drunked!",
            error,
            success: false,
        });
    }
};

const verifyUser = async (req, res) => {
    // get token from url
    const { token } = req.params;
    console.log(token);

    // validate
    if (!token) {
        return res.status(400).json({
            message: "Invalid token",
        });
    }

    // find user based on token
    const user = await User.findOne({ verificationToken: token });

    // if not handle edge case 
    if (!user) {
        return res.status(400).json({
            message: "User not registered",
        });
    }
    // set isVerified field to true
    user.isVerified = true

    // remove verification token
    user.verificationToken = undefined;

    // save
    await user.save();

    // return response
    res.status(210).json({
        message: "User Verified successfully!",
        success: true
    })
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        // token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWTSECRET, { expiresIn: "24h" });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        }

        res.cookie("token", token, cookieOptions);

        // return status
        res.status(202).json({
            message: "Login Successfull!",
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Got drunked while logging!",
            error,
            success: false,
        });
    }
}
export { registerUser, verifyUser, login };


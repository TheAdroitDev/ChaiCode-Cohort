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
    console.log('User Verified successfully!');

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
                message: "User not registered",
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
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWTSECRET.toString(), { expiresIn: "24h" });

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
        console.log('Login Successfull!');

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Got drunked while logging!",
            error,
            success: false,
        });
    }
}

const getMe = async function (req, res) {
    try {
        // get user
        const user = await User.findById(req.user.id).select("-password");
        console.log(user);

        // validate
        if (!user) {
            res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log('Internal server error while getting user!')
        res.status(500).json({
            message: "Internal server error while getting user!",
            error,
            success: false,
        });
    }
}

const logout = async function (req, res) {
    try {
        res.cookie("token", "", {});
        res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log('Internal server error while logging out!')
        res.status(500).json({
            message: "Internal server error while logging out!",
            error,
            success: false,
        });
    }
}

const forgotPassword = async function (req, res) {
    try {
        // get email
        const { email } = req.body

        // validation 
        if (!email) {
            res.status(400).json(
                { message: "email is required" }
            )
        };

        // find user based on email
        const user = await User.findOne({ email });

        // validation
        if (!user) {
            return res.status(400).json(
                { message: "User not found" }
            );
        }

        // create token
        const resetPassword = crypto.randomBytes(32).toString("hex")

        // reset token + reset expiry => Date.now() + 10 * 60 * 1000 => user.save()
        user.resetPasswordToken = resetPassword;
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000

        await user.save()

        // send mail => design url
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
            text: `Click the following link to reset your password: 
            ${process.env.BASE_URL}/api/v1/users/resetpassword/${resetPassword} 
            This link is valid for 10 minutes.`,
            html: `
                <h2>Password Reset Request</h2>
                <p>Click the button below to Password Reset Request:</p>
                <a href="${process.env.BASE_URL}/api/v1/users/resetpassword/${resetPassword}" 
                   style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #708775; 
                          text-decoration: none; border-radius: 5px;">
                    Reset Password
                </a>
                <p>If the button doesn't work, copy and paste the following link into your browser:</p>
                <p><a href="$${process.env.BASE_URL}/api/v1/users/resetpassword/${resetPassword}">
                    ${process.env.BASE_URL}/api/v1/users/resetpassword/${resetPassword}
                </a></p>
            `,
        };

        // send email
        await transporter.sendMail(mailOptions);

        console.log("Password reset link sent")
        res.status(200).json({
            message: "Password reset link sent",
            success: true
        });
    } catch (error) {
        console.log("Internal server error while forgetting password", error)
        res.status(500).json({
            message: "Internal server error while forgetting password!",
            error,
            success: false,
        });
    }
}

const resetPassword = async function (req, res) {
    // collect token from params
    const { token } = req.params;

    // password from req.body
    const { password, confPassword } = req.body;

    if (!password || !confPassword) {
        return res.status(400).json({ message: "Both password fields are required" });
    }
    if (password !== confPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        // validation
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        // set password in user
        user.password = password

        // resetToken, resetExpiry => reset
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        // save
        await user.save()

        res.status(200).json(
            {
                message: "Password reset successful",
                success: true
            }
        );
        console.log("Password reset successful")
    } catch (error) {
        console.log('Internal Server error while resseting password');
        res.status(500).json({
            message: "Internal Server error while resseting password",
            success: false,
        })
    }
}
export { registerUser, verifyUser, login, getMe, resetPassword, forgotPassword };


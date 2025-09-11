import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";

const registerUser = asyncHandler(async (req, res) => {
    // get data
    const { email, username, password, role, fullname } = req.body;

    // validation
    if (!email || !username || !password || !role || !fullname) {
        res.status(400).json(
            new ApiResponse(400, { message: "All fields are required" })
        )
    }

    // check if user already exists
    const existingUser = await User.findOne({ email })
    if (!existingUser) {
        throw new ApiError((400), "User already exists")
    }

    // create new user 
    const user = await User.create({
        username,
        fullname,
        email,
        password,
        role
    })


    //if user not registered
    if (!user) {
        throw new ApiError((400), "User not registered")
    }

    // save user
    await user.save()

    // send email
    return res.status(201).json(
        new ApiResponse(201, "user registered success", user)
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const { email } = req.body;

    // validation

})

const logoutUser = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const verifyEmail = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const resendVerificationEmail = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const refreshAccessToken = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const forgotPasswordRequest = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const changeCurrentPassword = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

const getCurrentUser = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation

})

export { registerUser }
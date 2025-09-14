import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { sendEmail, forgotPasswordMailgenContent, emailVerificationMailgenContent } from "../utils/mail.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // attach refresh token to the user document to avoid refreshing the access token with multiple refresh tokens
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating the access token",
        );
    }
};


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
        email,
        password,
        username,
        isEmailVerified: false,
    })

    //if user not registered
    if (!user) {
        throw new ApiError((400), "User not registered");

    }

    // create tokens
    const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken()

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    // save user
    await user.save()

    // send email
    await user.sendEmail({
        email: user?.email,
        subject: "Please verify your email",
        mailgenContent: emailVerificationMailgenContent(
            user.username,
            `${req.protocol}://${req.get(
                "host",
            )}/api/v1/users/verify-email/${unHashedToken}`,
        ),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }


    return res.status(201).json(
        new ApiResponse(200, "Users registered successfully and verification email has been sent on your email.", { user: createdUser })
    )

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    // validation 
    if (!username || !email) {
        throw new ApiError(401, "Username or email is required")
    }

    // find user based on either by username or email
    const user = await user.findOne({
        $or: [{ username }, { email }],
    })

    if (!user) {
        throw new ApiError(401, "User not registered")

    }

    // compare the incoming password with hashed password 
    if (password) {
        const isPasswordValid = await user.isPasswordCorrect(password)
    }
    else {
        throw new ApiError(401, "Password is incorrect")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    // get the user document ignoring the password and refreshToken field
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );


    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options) // set the access token in the cookie
        .cookie("refreshToken", refreshToken, options) // set the refresh token in the cookie
        .json(
            new ApiResponse(201, { user: loggedInUser, accessToken, refreshToken }, // send access and refresh token in response if client decides to save them by themselves
                "User logged in successfully",)
        )
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user_id,
        {
            $set: {
                refreshToken: "",
            },
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV
    }

    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(
        new ApiResponse(200, "User logged out", {})
    )
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
        throw new ApiError(400, "User verification token is missing")
    }

    // generate a hash from the token that we are receiving
    const hashedToken = crypto.createHash("sha256").update(verificationToken).digest("hex");

    const user = await User.findOne({
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },
    })

    if (!user) {
        throw new ApiError(489, "Token is expired or invalid")
    }


    // If we found the user that means the token is valid
    // Now we can remove the associated email token and expiry date as we no  longer need them
    user.emailVerificationToken = undefined
    user.emailVerificationExpiry = undefined
    // turn the emailVerification flag to true
    user.isEmailVerified = true;

    await user.save()

    return res.status(200).json(new ApiResponse(200, "Email is verified", { isEmailVerified: true }))
})

const resendVerificationEmail = asyncHandler(async(req, res) => {
    

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

export { registerUser, loginUser, logoutUser, verifyEmail }
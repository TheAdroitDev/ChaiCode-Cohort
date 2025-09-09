import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation
    
})

const loginUser = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

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
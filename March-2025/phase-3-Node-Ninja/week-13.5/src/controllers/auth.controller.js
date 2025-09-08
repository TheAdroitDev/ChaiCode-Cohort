import { asyncHandler } from "../utils/async-handler.js";

const registerUser = asyncHandler((req, res) => {
    const { email, username, password, role } = req.body;

    // validation
    registrationValidation(body)
})

export { registerUser }
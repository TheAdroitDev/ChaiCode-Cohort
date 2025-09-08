import { body } from "express-validator";

const userRegistrationValidator = () => {
    return [
        body('email')
            .trim()
            .isEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body('username')
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3 }).withMessage("Minimun username lenght is 3")
            .isLength({ max: 15 }).withMessage("Maximum username lenght is 15"),
        body('password')
            .trim()
            .notEmpty().withMessage("Username is required")
    ]
}

const userLoginValidator = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage("Email is invalid")
            .isEmpty().withMessage("Email is required"),
        body('password')
            .trim()
            .notEmpty().withMessage("Password is required")
    ]
}

export { userRegistrationValidator, userLoginValidator };
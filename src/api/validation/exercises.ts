import { body } from "express-validator"

export const exerciseRules = () => {
    return [
        body("name")
            .notEmpty()
            .withMessage("provide a value for name")
            .isString()
            .withMessage("provide a name that is a string"),
        body("tags")
            .notEmpty()
            .withMessage("provide a value for tags")
            .isArray()
            .withMessage("tags should be an array")
    ]
}

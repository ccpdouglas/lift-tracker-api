import { body, ValidationChain } from "express-validator"

export const exerciseRules = (): ValidationChain[] => {
    return [
        body("name")
            .notEmpty()
            .withMessage("provide a value for name")
            .bail()
            .isString()
            .withMessage("provide a name that is a string"),
        body("tags")
            .notEmpty()
            .withMessage("provide a value for tags")
            .bail()
            .isArray()
            .withMessage("tags should be an array")
            .bail()
            .custom((input: []): boolean => {
                const hasNonStrings = input.filter(elem => typeof elem !== "string").length > 0
                if (hasNonStrings) throw Error("provide an array of strings for tags")
                return true
            })
    ]
}

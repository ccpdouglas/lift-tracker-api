import { body, ValidationChain, param } from "express-validator"
import { Types } from "mongoose"

export const exerciseURLRules = (): ValidationChain[] => {
    return [
        param("id").custom((input: string): boolean => {
            const isValid = Types.ObjectId.isValid(input)
            if (!isValid) throw new Error("provide a valid ObjectId in query")
            return true
        })
    ]
}

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
                if (hasNonStrings) throw new Error("provide an array of strings for tags")
                return true
            })
    ]
}

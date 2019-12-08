import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"

export default async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    return res.status(422).json(errors)
}

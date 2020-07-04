import { Router, Request, Response } from "express"
import setRouter from "./set"
import reportRouter from "./report"
import Exercise from "../../models/Exercise"
import ExerciseController from "../controllers/ExerciseController"
import { exerciseRules, exerciseURLRules } from "../validation/exercises"
import validate from "../validation"

const exerciseRouter = Router()
const exerciseController = new ExerciseController(Exercise)

exerciseRouter.get("/", async (req: Request, res: Response) => {
    const documents = await exerciseController.getAll()
    return res.json(documents)
})

exerciseRouter.post("/", exerciseRules(), validate, async (req: Request, res: Response) => {
    const document = await exerciseController.create(req.body)
    return res.json(document)
})

exerciseRouter.get("/:id", exerciseURLRules(), validate, async (req: Request, res: Response) => {
    try {
        const document = await exerciseController.get(req.params.id)
        return res.json(document)
    } catch (error) {
        if (error.name === "404") return res.status(404).json({ errors: [{ error: "document not found" }] })
        return res.status(500).json({ errors: [{ error: "internal server error" }] })
    }
})

exerciseRouter.patch("/:id", exerciseURLRules(), exerciseRules(), validate, async (req: Request, res: Response) => {
    try {
        const document = await exerciseController.update(req.params.id, req.body)
        return res.json(document)
    } catch (error) {
        if (error.name === "404") return res.status(404).json({ errors: [{ error: "document not found" }] })
        return res.status(500).json({ errors: [{ error: "internal server error" }] })
    }
})

exerciseRouter.delete("/:id", exerciseURLRules(), validate, async (req: Request, res: Response) => {
    try {
        await exerciseController.delete(req.params.id)
        return res.status(200)
    } catch (error) {
        if (error.name === "404") return res.status(404).json({ errors: [{ error: "document not found" }] })
        return res.status(500).json({ errors: [{ error: "internal server error" }] })
    }
})

exerciseRouter.use("/:id/sets", setRouter)

exerciseRouter.use("/:id/report", reportRouter)

export default exerciseRouter

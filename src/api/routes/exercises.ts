import { Router, Request, Response } from "express"
import setRouter from "./set"
import reportRouter from "./report"
import Exercise from "../../models/Exercise"
import ExerciseController from "../controllers/ExerciseController"
import { exerciseRules } from "../validation/exercises"
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

exerciseRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const document = await exerciseController.get(req.params.id)
        return res.json(document)
    } catch (error) {
        return res.status(404).json({ errors: [{ error: "document not found" }] })
    }
})

exerciseRouter.patch("/:id", exerciseRules(), validate, async (req: Request, res: Response) => {
    const document = await exerciseController.update(req.params.id, req.body)
    return res.json(document)
})

exerciseRouter.delete("/:id", async (req: Request, res: Response) => {
    await exerciseController.delete(req.params.id)
    return res.status(200)
})

exerciseRouter.use("/:id/sets", setRouter)

exerciseRouter.use("/:id/report", reportRouter)

export default exerciseRouter

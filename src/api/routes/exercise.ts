import { Router } from "express"
import setRouter from "./set"
import reportRouter from "./report"
import Exercise from "../../models/Exercise"
import ExerciseController from "../controllers/ExerciseController"

const exerciseRouter = Router()
const exerciseController = new ExerciseController(Exercise)

exerciseRouter.get("/", async (req, res, next) => {
    const documents = await exerciseController.getAll()
    return res.json(documents)
})

exerciseRouter.post("/", async (req, res, next) => {
    const document = await exerciseController.create(req.body)
    return res.json(document)
})

exerciseRouter.get("/:id", async (req, res, next) => {
    const document = await exerciseController.get(req.params.id)
    return res.json(document)
})

exerciseRouter.patch("/:id", async (req, res, next) => {
    const document = await exerciseController.update(req.params.id, req.body)
    return res.json(document)
})

exerciseRouter.delete("/:id", async (req, res, next) => {
    await exerciseController.delete(req.params.id)
    return res.status(200)
})

exerciseRouter.use("/:id/sets", setRouter)

exerciseRouter.use("/:id/report", reportRouter)

export default exerciseRouter

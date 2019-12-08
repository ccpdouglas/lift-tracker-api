import { Router } from "express"
import SetController from "../controllers/SetController"
import SetModel from "../../models/Set"
import ExerciseModel from "../../models/Exercise"

const setController = new SetController(SetModel, ExerciseModel)
const setRouter = Router({ mergeParams: true })

setRouter.post("/", async (req, res, next) => {
    const document = await setController.create(req.params.id, req.body)
    return res.json(document)
})

setRouter.get("/", async (req, res, next) => {
    const documents = await setController.getAll(req.params.id)
    return res.json(documents)
})

setRouter.get("/:setId", async (req, res, next) => {
    const document = await setController.get(req.params.setId)
    return res.json(document)
})

setRouter.patch("/:setId", async (req, res, next) => {
    const document = await setController.update(req.params.setId, req.body)
    return res.json(document)
})

setRouter.delete("/:setId", async (req, res, next) => {
    const document = await setController.delete(req.params.setId)
    return res.json(document)
})

export default setRouter

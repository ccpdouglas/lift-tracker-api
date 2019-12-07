import { Router } from "express"
import setRouter from "./set"
import reportRouter from "./report"
import Exercise from "../../models/Exercise"

const exerciseRouter = Router()

exerciseRouter.get("/", async (req, res, next) => {
    const results = await Exercise.find({}).exec()
    res.json(results)
})

exerciseRouter.post("/", async (req, res, next) => {
    const { body } = req
    const newExercise = new Exercise(body)
    const document = await newExercise.save()
    res.json(document)
})

exerciseRouter.get("/:id")

exerciseRouter.patch("/:id")

exerciseRouter.delete("/:id")

exerciseRouter.use("/set", setRouter)

exerciseRouter.use("/report", reportRouter)

export default exerciseRouter

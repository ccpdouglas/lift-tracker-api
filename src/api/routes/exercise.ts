import { Router } from "express"
import setRouter from "./set"
import reportRouter from "./report"

const exerciseRouter = Router()

exerciseRouter.get("/")

exerciseRouter.post("/")

exerciseRouter.get("/:id")

exerciseRouter.patch("/:id")

exerciseRouter.delete("/:id")

exerciseRouter.use("/set", setRouter)

exerciseRouter.use("/report", reportRouter)

export default exerciseRouter

import { Router } from "express"

const setRouter = Router()

setRouter.post("/")

setRouter.get("/")

setRouter.get("/:id")

setRouter.patch("/:id")

setRouter.delete("/:id")

export default setRouter

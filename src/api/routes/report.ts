import { Router } from "express"

const reportRouter = Router()

reportRouter.get("/:reportType")

export default reportRouter

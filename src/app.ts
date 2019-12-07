import express from "express"
import exerciseRouter from "./api/routes/exercise"

const app = express()

app.use("/exercise", exerciseRouter)

export default app

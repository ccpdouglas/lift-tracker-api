import express from "express"
import exerciseRouter from "./api/routes/exercises"
import bodyParser from "body-parser"

const app = express()

app.use(bodyParser.json())
app.use("/exercises", exerciseRouter)

export default app

import mongoose from "mongoose"
import app from "./app"

mongoose.connect("mongodb://localhost:27017/liftTracker", { useNewUrlParser: true, useUnifiedTopology: true })

app.listen(3000)

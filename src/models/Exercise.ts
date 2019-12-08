import { Schema, model } from "mongoose"
import { IExercise } from "../types"

const exerciseSchema = new Schema({
    name: String,
    sets: [Schema.Types.ObjectId],
    tags: [String]
})

export default model<IExercise>("Exercise", exerciseSchema)

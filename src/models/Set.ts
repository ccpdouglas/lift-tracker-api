import { Schema, model } from "mongoose"
import { ISet } from "../types"

const setSchema = new Schema({
    weight: Number,
    reps: Number,
    comments: String
})

export default model<ISet>("Set", setSchema)

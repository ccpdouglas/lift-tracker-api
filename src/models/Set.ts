import { Schema, model } from "mongoose"

const setSchema = new Schema({
    weight: Number,
    reps: Number,
    comments: String
})

export default model("Set", setSchema)

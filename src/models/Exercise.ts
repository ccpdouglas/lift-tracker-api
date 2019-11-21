import { Schema, model } from "mongoose"

const exerciseSchema = new Schema({
    name: String,
    sets: [Schema.Types.ObjectId],
    tags: [String]
})

export default model("Exercise", exerciseSchema)

import { Model } from "mongoose"
import { IExerciseController, IExercise } from "../../types"

export default class ExerciseController implements IExerciseController {
    constructor(private _ExerciseModel: Model<IExercise, {}>) {}

    public async getAll(): Promise<IExercise[]> {
        const documents = await this._ExerciseModel.find({}).exec()
        return documents
    }

    public async create(name: string): Promise<IExercise> {
        const newExercise = new this._ExerciseModel({ name })
        const document = await newExercise.save()
        return document
    }

    public async delete(id: string): Promise<void> {
        await this._ExerciseModel.findByIdAndDelete(id).exec()
    }

    public async get(id: string): Promise<IExercise> {
        const document = await this._ExerciseModel.findById(id).exec()
        return document.toJSON()
    }

    public async update(id: string, name: string): Promise<IExercise> {
        const document = await this._ExerciseModel.findById(id, { name }).exec()
        document.name = name
        const updatedDocument = await document.save()
        return updatedDocument
    }
}

import { Model, Types } from "mongoose"
import { IExerciseController, IExercise, IExerciseValues, ICreateExerciseValues } from "../../types"

export default class ExerciseController implements IExerciseController {
    constructor(private _ExerciseModel: Model<IExercise, {}>) {}

    public async getAll(): Promise<IExercise[]> {
        const documents = await this._ExerciseModel.find({}).exec()
        return documents
    }

    public async create(exercise: ICreateExerciseValues): Promise<IExercise> {
        const newExercise = new this._ExerciseModel(exercise)
        const document = await newExercise.save()
        return document
    }

    public async delete(id: string): Promise<void> {
        const document = await this._ExerciseModel.findByIdAndDelete(Types.ObjectId(id)).exec()

        if (document === null) {
            const error = new Error("document not found")
            error.name = "404"
            throw error
        }
    }

    public async get(id: string): Promise<IExercise> {
        const document = await this._ExerciseModel.findById(Types.ObjectId(id)).exec()

        if (document === null) {
            const error = new Error("document not found")
            error.name = "404"
            throw error
        }

        return document.toJSON()
    }

    public async update(id: string, { name, sets, tags }: IExerciseValues): Promise<IExercise> {
        const document = await this._ExerciseModel.findById(Types.ObjectId(id), { name }).exec()

        if (document === null) {
            const error = new Error("document not found")
            error.name = "404"
            throw error
        }

        document.name = name
        document.sets = sets
        document.tags = tags
        await document.save()
        return document.toJSON()
    }
}

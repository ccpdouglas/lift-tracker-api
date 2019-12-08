import { Model } from "mongoose"
import { IExerciseController, IExercise, IExerciseValues } from "../../types"

export default class ExerciseController implements IExerciseController {
    constructor(private _ExerciseModel: Model<IExercise, {}>) {}

    public async getAll(): Promise<IExercise[]> {
        const documents = await this._ExerciseModel.find({}).exec()
        return documents
    }

    public async create(exercise: IExerciseValues): Promise<IExercise> {
        const newExercise = new this._ExerciseModel(exercise)
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

    public async update(id: string, { name, sets, tags }: IExerciseValues): Promise<IExercise> {
        const document = await this._ExerciseModel.findById(id, { name }).exec()
        document.name = name
        document.sets = sets
        document.tags = tags
        await document.save()
        return document
    }
}

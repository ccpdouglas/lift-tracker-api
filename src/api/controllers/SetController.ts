import { ISet, ISetController, IExercise, ISetValues } from "../../types"
import { Model } from "mongoose"

export default class SetController implements ISetController {
    constructor(private _SetModel: Model<ISet>, private _ExerciseModel: Model<IExercise>) {}

    public async getAll(exerciseId: string): Promise<ISet[]> {
        console.log(exerciseId)
        const exerciseDocument = await this._ExerciseModel.findById(exerciseId).exec()
        console.log(exerciseDocument)
        const setDocuments = await Promise.all(exerciseDocument.sets.map(async id => await this._SetModel.findById(id)))
        return setDocuments
    }

    public async get(id: string): Promise<ISet> {
        const document = await this._SetModel.findById(id).exec()
        return document
    }

    public async create(exerciseId: string, set: ISetValues): Promise<ISet> {
        const exercise = await this._ExerciseModel.findById(exerciseId).exec()
        const newSet = new this._SetModel(set)
        const document = await newSet.save()
        exercise.sets.push(newSet._id)
        await exercise.save()

        return document
    }

    public async update(id: string, { comments, reps, weight }: ISetValues): Promise<ISet> {
        const document = await this._SetModel.findById(id).exec()
        document.comments = comments
        document.reps = reps
        document.weight = weight
        await document.save()
        return document
    }

    public async delete(id: string): Promise<void> {
        await this._SetModel.findOneAndDelete(id).exec()
    }
}

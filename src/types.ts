import { Document } from "mongoose"

export interface IExercise extends Document {
    name: string
    tags: string[]
    sets: string[]
}

export interface IExerciseController {
    getAll(): Promise<IExercise[]>
    get(id: string): Promise<IExercise>
    create(name: string): Promise<IExercise>
    delete(id: string): Promise<void>
    update(id: string, name: string): Promise<IExercise>
}

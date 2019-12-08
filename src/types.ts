import { Document } from "mongoose"

export interface IExerciseValues {
    name: string
    tags: string[]
    sets: string[]
}

export interface ISetValues {
    weight: number
    reps: number
    comments: string
}

export interface IExercise extends Document, IExerciseValues {}

export interface ISet extends Document, ISetValues {}

export interface ISetController {
    getAll(exerciseId: string): Promise<ISet[]>
    get(exerciseId: string): Promise<ISet>
    create(exerciseId: string, set: ISetValues): Promise<ISet>
    delete(id: string): Promise<void>
    update(id: string, set: ISetValues): Promise<ISet>
}

export interface IExerciseController {
    getAll(): Promise<IExercise[]>
    get(id: string): Promise<IExercise>
    create(exercise: IExerciseValues): Promise<IExercise>
    delete(id: string): Promise<void>
    update(id: string, exercise: IExerciseValues): Promise<IExercise>
}

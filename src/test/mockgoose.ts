import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

const mongod = new MongoMemoryServer()

export const connect = async function(): Promise<void> {
    const uri = await mongod.getConnectionString()

    const mongooseOpts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000
    }

    await mongoose.connect(uri, mongooseOpts)
}

export const closeDatabase = async function(): Promise<void> {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongod.stop()
}

export const clearDatabase = async function(): Promise<void> {
    const collections = mongoose.connection.collections

    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany({})
    }
}

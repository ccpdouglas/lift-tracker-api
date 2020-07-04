import chai from "chai"
import chaiHttp from "chai-http"
import server from "../app"
import { connect, clearDatabase, closeDatabase } from "./mockgoose"
import ExerciseController from "../api/controllers/ExerciseController"
import Exercise from "../models/Exercise"
import { Types } from "mongoose"

const exerciseController = new ExerciseController(Exercise)
const expect = chai.expect

chai.use(chaiHttp)

before(async () => await connect())

afterEach(async () => await clearDatabase())

after(async () => await closeDatabase())

describe("exercise", () => {
    describe("GET /exercises", () => {
        it("should get all exercises", async () => {
            const exerciseBody = { name: "test exercise", tags: ["test"] }
            const exerciseBody2 = { name: "test exercise two", tags: ["test"] }
            const expectedResponse = [{ ...exerciseBody, sets: [] }, { ...exerciseBody2, sets: [] }]

            await exerciseController.create(exerciseBody)
            await exerciseController.create(exerciseBody2)

            const response = await chai.request(server).get("/exercises")

            expect(response.status).to.equal(200)
            expect(response.body.map(({ name, sets, tags }) => ({ name, sets, tags }))).to.deep.equal(expectedResponse)
        })

        it("should return empty array when no exercies found", async () => {
            const response = await chai.request(server).get("/exercises")

            expect(response.status).to.equal(200)
            expect(response.body).to.deep.equal([])
        })
    })

    describe("POST /exercises", () => {
        it("should return 422 when name is missing", async () => {
            const exercise = { tags: ["test"] }
            const expectedError = { errors: [{ location: "body", msg: "provide a value for name", param: "name" }] }

            const response = await chai
                .request(server)
                .post("/exercises")
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when name is not a string", async () => {
            const exercise = { name: 1, tags: ["test"] }
            const expectedError = {
                errors: [{ location: "body", msg: "provide a name that is a string", param: "name", value: 1 }]
            }

            const response = await chai
                .request(server)
                .post("/exercises")
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when tags are not provided", async () => {
            const exercise = { name: "exercise" }
            const expectedError = { errors: [{ location: "body", msg: "provide a value for tags", param: "tags" }] }

            const response = await chai
                .request(server)
                .post("/exercises")
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when tags are not an array of strings", async () => {
            const exercise = { name: "exercise", tags: [1, 2, 3] }
            const expectedError = {
                errors: [
                    { location: "body", msg: "provide an array of strings for tags", param: "tags", value: [1, 2, 3] }
                ]
            }

            const response = await chai
                .request(server)
                .post("/exercises")
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should create a new exercise and return exercise in response", async () => {
            const exerciseBody = { name: "test exercise", tags: ["test"] }
            const expectedResponse = { name: "test exercise", tags: ["test"], sets: [] }

            const response = await chai
                .request(server)
                .post("/exercises")
                .send(exerciseBody)

            const { name, tags, sets, _id } = response.body

            expect(response.status).to.equal(200)
            expect({ name, tags, sets }).to.deep.equal(expectedResponse)
            expect(_id).to.be.a("string")
        })
    })

    describe("GET /exercises/:id", () => {
        it("should get one exercise", async () => {
            const exerciseBody = { name: "exercise", tags: ["test"] }
            const expected = { name: "exercise", tags: ["test"], sets: [] }
            const exercise = await exerciseController.create(exerciseBody)
            const response = await chai.request(server).get(`/exercises/${exercise._id}`)
            const { name, tags, sets, _id } = response.body

            expect(response.status).to.equal(200)
            expect({ name, tags, sets }).to.deep.equal(expected)
            expect(_id).to.be.a("string")
        })

        it("should return 404 when exercise does not exist", async () => {
            const response = await chai.request(server).get(`/exercises/${Types.ObjectId()}`)
            expect(response.status).to.equal(404)
        })
    })

    describe("PATCH /exercises/:id", () => {
        it("should return 422 when name is missing", async () => {
            const exercise = { tags: ["test", "test two"] }
            const expectedError = { errors: [{ location: "body", msg: "provide a value for name", param: "name" }] }
            const response = await chai
                .request(server)
                .patch(`/exercises/${Types.ObjectId()}`)
                .send(exercise)
            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when name is not a string", async () => {
            const exercise = { name: 1, tags: ["test"] }
            const expectedError = {
                errors: [{ location: "body", msg: "provide a name that is a string", param: "name", value: 1 }]
            }
            const response = await chai
                .request(server)
                .patch(`/exercises/${Types.ObjectId()}`)
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when tags are not provided", async () => {
            const exercise = { name: "exercise" }
            const expectedError = { errors: [{ location: "body", msg: "provide a value for tags", param: "tags" }] }
            const response = await chai
                .request(server)
                .patch(`/exercises/${Types.ObjectId()}`)
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 422 when tags are not an array of strings", async () => {
            const exercise = { name: "exercise", tags: [1, 2, 3] }
            const expectedError = {
                errors: [
                    { location: "body", msg: "provide an array of strings for tags", param: "tags", value: [1, 2, 3] }
                ]
            }
            const response = await chai
                .request(server)
                .patch(`/exercises/${Types.ObjectId()}`)
                .send(exercise)

            expect(response.status).to.equal(422)
            expect(response.body).to.deep.equal(expectedError)
        })

        it("should return 404 when exercise does not exist", async () => {
            const response = await chai
                .request(server)
                .patch(`/exercises/${Types.ObjectId()}`)
                .send({ name: "test", tags: ["test"] })
            expect(response.status).to.equal(404)
        })

        it("should update an exercise and return the updated exercise", async () => {
            const updateBody = { name: "testing", tags: ["tag"], sets: [] }
            const exercise = await exerciseController.create({ name: "test", tags: [] })

            console.log(`exercises/${exercise._id}`)

            const response = await chai
                .request(server)
                .patch(`/exercises/${exercise._id}`)
                .send(updateBody)

            const { name, tags, sets, _id } = response.body

            expect(response.status).to.equal(200)
            expect({ name, tags, sets }).to.deep.equal(updateBody)
            expect(_id).to.be.a("string")
        })
    })

    describe("DELETE /exercises/:id", () => {
        it("should return 404 when exercise does not exist", async () => {
            const response = await chai.request(server).delete(`/exercises/${Types.ObjectId()}`)
            expect(response.status).to.equal(404)
        })

        it("should delete an exercise", async () => {
            const exercise = await exerciseController.create({ name: "test", tags: [] })
            const response = await chai.request(server).delete(`/exercises/${exercise._id}`)
            expect(response.status).to.equal(200)
        })
    })
})

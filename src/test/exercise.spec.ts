import chai from "chai"
import chaiHttp from "chai-http"
import server from "../app"
import { connect, clearDatabase, closeDatabase } from "./mockgoose"

const expect = chai.expect

chai.use(chaiHttp)

before(async () => await connect())

afterEach(async () => await clearDatabase())

after(async () => await closeDatabase())

describe("exercise", () => {
    describe("GET /exercises", () => {
        it("should create two exercies and get all exercises", async () => {
            const exerciseBody = { name: "test exercise", tags: ["test"] }
            const exerciseBody2 = { name: "test exercise two", tags: ["test"] }
            const expectedResponse = [{ ...exerciseBody, sets: [] }, { ...exerciseBody2, sets: [] }]

            await chai
                .request(server)
                .post("/exercises")
                .send(exerciseBody)

            await chai
                .request(server)
                .post("/exercises")
                .send(exerciseBody2)

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
        it("should create and get one exercise", async () => {
            const exerciseBody = { name: "exercise", tags: ["test"] }
            const expected = { name: "exercise", tags: ["test"], sets: [] }
            const { _id: exerciseId } = (await chai
                .request(server)
                .post("/exercises")
                .send(exerciseBody)).body
            const response = await chai.request(server).get(`/exercises/${exerciseId}`)
            const { name, tags, sets, _id } = response.body

            expect(response.status).to.equal(200)
            expect({ name, tags, sets }).to.deep.equal(expected)
            expect(_id).to.be.a("string")
        })

        it("should return 404 when exercise does not exist", async () => {
            const response = await chai.request(server).get(`/exercises/1`)
            expect(response.status).to.equal(404)
        })
    })

    describe("PATCH /exercises/:id", () => {
        it("should return 422 when name is missing", () => {})

        it("should return 404 when exercise does not exist", async () => {})

        it("should update an exercise", () => {})

        it("should return the created exercise", () => {})
    })

    describe("DELETE /exercises/:id", () => {
        it("should return 404 when exercise does not exist", async () => {})

        it("should delete an exercise", () => {})
    })
})

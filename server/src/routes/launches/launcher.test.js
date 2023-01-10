const request = require("supertest")
const app = require("../../app");
const {mongoConnect, mongoDisconnect} = require("../../services/mongo");

describe("Launches API", ()=>{
    beforeAll(async () => {
        await mongoConnect()
    });
    afterAll(async ()=>{
        await mongoDisconnect()
    })
    describe('Test GET: /v1/launches',()=>{
        test('It should respond with 200 success',async ()=>{
            const response = await request(app)
                .get('/v1/launches')
                .expect('Content-Type',/json/)
                .expect(200)
        })
    })

    describe('Test POST: /v1/launches', () => {
        const launchData = {
            mission: "Kepler exploration x",
            rocket: "Shahrokh-rocket",
            launchDate: new Date('December 27, 2023'),
            target: "Kepler-62 f",
        }
        const launchDataWithoutDate = {
            mission: "Kepler exploration x",
            rocket: "Shahrokh-rocket",
            target: "Kepler-62 f",
        }
        const launchDataWithInvalidData = {
            mission: "Kepler exploration x",
            rocket: "Shahrokh-rocket",
            launchDate: "wrong date",
            target: "Kepler-62 f",
        }

        test("It should respond with 201 success", async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchData)
                .expect('Content-Type', /json/)
                .expect(201)

            const requestDate = new Date(launchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();

            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate)
        })

        test("It should catch invalid date", async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidData)
                .expect('Content-Type', /json/)
                .expect(400);
            expect(response.body).toStrictEqual({
                error: 'Invalid launch date'
            })
        })

        test('It should catch missing require property', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)
            expect(response.body).toStrictEqual({
                error: "Missing require launch property"
            })

        })
    });
})

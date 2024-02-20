const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data/index.js');

beforeEach(() => seed( testData ));
afterAll(() => db.end());

describe('GET/api/topics', () => {
    test('should return an array of topic objects, each of which should have a slug and description property ', () => {
        return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
            expect(response.body.topics.length).toBe(3);
            response.body.topics.forEach((topic) => {
                expect(typeof topic.description).toBe('string');
                expect(typeof topic.slug).toBe('string');
            });
        });
    });
});
describe('Path not found', () => {
    test('returns 404 for path that does not exist', () => {
        return request(app)
        .get ('/api/notAPath')
        .expect(404)
        .then((response) => {
            console.log(response);
            expect(response.body.msg).toBe('Not found')
        });
    });
});

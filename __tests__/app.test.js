const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const devData = require('../db/data/development-data');
const endpoints = require('../endpoints.json');

beforeEach(() => seed( devData ));
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
            expect(response.body.msg).toBe('Not found')
        });
    });
});
describe('endpoints', () => {
    test('should return an object describing all the available endpoints on your API', () => {
        return request(app)
        .get ('/api')
        .expect(200)
        .then ((response) => {
            console.log(response.body, '>>> test');
            expect(response.body).toEqual({endpoints})
        })
    });
    
});





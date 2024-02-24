const app = require('../app');
const request = require('supertest');
const db = require('../db/connection.js');
const seed = require('../db/seeds/seed.js');
const testData = require('../db/data/test-data')
const endpoints = require('../endpoints.json');
const { response } = require('express');

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
            expect(response.body).toEqual({endpoints})
        })
    });
});
describe('/api/articles/:article_id', () => {
    test('returns an article object with the following properties: title, topic, author, body, created_at, votes, article_img_url & article_id', () => {
        return request(app)
        .get('/api/articles/9')
        .expect(200)
        .then((response) => {
            expect(response.body.article.article_id).toBe(9);
            expect(response.body.article.title).toBe("They're not exactly dogs, are they?");
            expect(response.body.article.topic).toBe("mitch");
            expect(response.body.article.author).toBe("butter_bridge");
            expect(response.body.article.body).toBe("Well? Think about it.");
            expect(response.body.article.created_at).toBe("2020-06-06T10:10:00.000Z");
            expect(response.body.article.votes).toBe(0);
            expect(response.body.article.article_img_url).toBe("https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700");
        });
    });
    test('returns error 404 for id that is valid but does not exist in the articles table', () => {
        return request(app)
        .get('/api/articles/2000')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('No article found for 2000')
        });
    });
    test('returns error 400 for id that is invalid', () => {
        return request(app)
        .get('/api/articles/bash')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request')
        });
    });
});
describe('GET/api/articles', () => {
    test('returns an array of article object with the following properties: author, title, article_id, topic, created_at, votes, article_img_url & comment_count', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.articles.length).toBe(5);
            response.body.articles.forEach((article) => {
                expect(typeof article.author).toBe('string');
                expect(typeof article.title).toBe('string');
                expect(typeof article.article_id).toBe('number');
                expect(typeof article.topic).toBe('string');
                expect(typeof article.created_at).toBe('string');
                expect(typeof article.votes).toBe('number');
                expect(typeof article.article_img_url).toBe('string');
                expect(typeof article.comment_count).toBe('string');
            });
        });
    });
    test('returns an array of article objects sorted by created_at in descending order', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(response.body.articles).toBeSortedBy('created_at', {
                descending: true,
            });
        });
    });
});
describe('GET/api/articles/:article_id/comments', () => {
        test('returns an array of comments for the given article id', () => {
            return request(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => { 
                expect(response.body.comments.length).toBe(2);
                response.body.comments.forEach((comment) => {
                    expect(typeof comment.comment_id).toBe('number');
                    expect(typeof comment.votes).toBe('number');
                    expect(typeof comment.created_at).toBe('string');
                    expect(typeof comment.author).toBe('string');
                    expect(typeof comment.body).toBe('string');
                    expect(comment.article_id).toBe(9);
                })
            })
        });
        test('returns an array of comments for the given article id sorted by created_at in decending order', () => {
            return request(app)
            .get('/api/articles/9/comments')
            .expect(200)
            .then((response) => { 
                expect(response.body.comments).toBeSortedBy('created_at', {
                    descending: true,
                });
            })
        });
        test('returns error 404 when article id is valid but does not exist in the database', () => {
            return request(app)
            .get('/api/articles/100/comments')
            .expect(404)
            .then((response) => { 
                expect(response.body.msg).toBe('No comments found for 100');
            })
        });
        test('returns error 400 when invalid article id passed', () => {
            return request(app)
            .get('/api/articles/meow/comments')
            .expect(400)
            .then((response) => { 
                expect(response.body.msg).toBe('Bad request');
            })
        });
});
describe('POST /api/articles/:article_id/comments', () => {
    test('returns a comment for an article', () => {
        const comment = { 
            author: 'butter_bridge',
            body: 'Starbursts are better.'
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body.newComment.article_id).toBe(1);
            expect(response.body.newComment.body).toBe('Starbursts are better.');
        });
    });
    test('responds with 400 error for missing comment\'s body key', () => {
        const comment = { 
            author: 'butter_bridge'
        }
        return request(app)
        .post('/api/articles/1/comments')
        .send(comment)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
});
describe('PATCH /api/articles/:article_id', () => {
    test('should return updated article with votes amended', () => {
        const newVote = { inc_votes : -100}
        return request(app)
        .patch('/api/articles/5')
        .send(newVote)
        .expect(201)
        .then((response) => {
            expect(response.body.article.votes).toBe(-100);
        });
    });
    test('returns 400 error with error messgage when incorrect type passed', () => {
        const newVote = { inc_votes : "meow"}
        return request(app)
        .patch('/api/articles/5')
        .send(newVote)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad request');
        });
    });
});
describe('DELETE /api/comments/:comment_id', () => {
    test('should delete the given comment by comment_id', () => {
        return request(app)
        .delete('/api/comments/9')
        .expect(204);
    });
    test('responds with error 404 and error message when given a non-existent id', () => {
        return request(app)
          .delete('/api/comments/999')
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe('comment does not exist');
        });
    });    
});


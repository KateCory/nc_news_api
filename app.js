const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getEndpoints } = require('./controllers/endpoints-controller');
const { getArticleById } = require('./controllers/articles-controller');
const { getArticles } = require('./controllers/array-of-articles-controller');
const { getCommentsById, postCommentsById } = require('./controllers/comments-by-id-controller');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/articles/:article_id/comments', getCommentsById);
app.post('/api/articles/:article_id/comments', postCommentsById);

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    }
    else if (err.code === '22P02') {
        res.status(400).send({ msg: 'Bad request' });
      }
    else {
      res.status(500).send({ msg: 'Internal Server Error' });
    }
  });

app.all('/api/*', (request, response, next) =>  {
    response.status(404).send({ msg: 'Not found'})
});

module.exports = app;
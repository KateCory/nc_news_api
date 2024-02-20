const express = require('express');
const { getTopics } = require('./controllers/topics-controllers');
const { getEndpoints } = require('./controllers/endpoints-controller');
const app = express();

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getEndpoints);

app.all('/api/*', (request, response, next) =>  {
    response.status(404).send({ msg: 'Not found'})
});

module.exports = app;
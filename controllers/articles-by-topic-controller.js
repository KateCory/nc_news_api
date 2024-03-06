const { selectArticlesByTopic } = require("../models/articles-by-topic-model")

exports.getArticlesByTopic = (request, response, next) => {
   // console.log("in controller");
    const { topics } = request.query;
    //console.log(request.query, '>>> controller');
    selectArticlesByTopic().then((articles) => {
        response.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    });
};
const { selectArticleById, amendArticleById } = require("../models/articles-model")

exports.getArticleById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticleById(article_id)
    .then((article) => { 
        response.status(200).send({ article }) 
    })
    .catch((err) => {
        next(err)
    })
};

exports.patchArticleById = (request, response, next) => {
    const { article_id } = request.params;
    const { inc_votes } = request.body;
    amendArticleById( {article_id, inc_votes } )
    .then((article) => {
        response.status(201).send({ article });
    })
    .catch((err) => {
        next(err)
    })
};


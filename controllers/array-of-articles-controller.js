const { selectArticles } = require("../models/array-of-articles-model")

exports.getArticles = (request, response, next) => {
    selectArticles().then((articles) => {
        response.status(200).send({ articles })
    });
};
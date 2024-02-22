const { selectCommentsById } = require("../models/comments-by-id.model")

exports.getCommentsById = (request, response, next) => {
    const { article_id } = request.params;
    selectCommentsById(article_id).then((comments) => {
        response.status(200).send({ comments });
    })
    .catch((err) => {
        next(err)
    })
};
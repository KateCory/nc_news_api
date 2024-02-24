const { toLocaleString } = require("../db/data/test-data/users");
const { selectCommentsById, insertCommentById, removeCommentById } = require("../models/comments-by-id.model")

exports.getCommentsById = (request, response, next) => {
    const { article_id } = request.params;
    selectCommentsById(article_id).then((comments) => {
        response.status(200).send({ comments });
    })
    .catch((err) => {
        next(err)
    })
};

exports.postCommentsById = (request, response, next) => {
    const { article_id } = request.params;
    const { author, body } = request.body;
    insertCommentById({ article_id, author, body })
    .then((newComment) => {
        response.status(201).send({ newComment });
    })
    .catch((err) => {
        next(err);
    });
};

exports.deleteCommentById = (request, response, next) => {
    const { comment_id } = request.params; 
    removeCommentById({ comment_id })
    .then(() => {
        response.status(204).send();
    })
    .catch((err) => {
        next(err);
    });
};
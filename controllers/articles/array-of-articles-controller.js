const { selectArticles, selectArticlesByTopic } = require("../../models/array-of-articles-model");

exports.getArticles = (request, response, next) => {
    const { topic } = request.query;
    selectArticles(topic).then((articles) => {
        response.status(200).send({ articles })
    })
    .catch((err) => {
        next(err)
    });
};


// exports.getArticlesByTopic = (request, response, next) => {
//     console.log(request.query, '>>>controller');
    
//     selectArticlesByTopic(topic).then((articles) => {
//         response.status(200).send({ articles })
//     })
//     .catch((err) => {
//         next(err)
//     });
// };
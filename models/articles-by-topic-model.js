const db = require('../db/connection');

exports.selectArticlesByTopic = ({ cats }) => {
    return db.query(`
    SELECT * FROM articles
    WHERE aricles.topic = cats`)
    .then((articles) => {

    })
}
const db = require('../db/connection');

exports.selectArticles = (topic) => {
    const queries = []
    let sqlString = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*) AS comment_count
    FROM articles
    JOIN comments
    ON comments.article_id = articles.article_id`

    if(topic) {
        sqlString += ` WHERE topic=$1`
        queries.push(topic)
    }

    sqlString += ` GROUP BY articles.article_id
    ORDER BY created_at DESC`
    console.log(sqlString);
    // return db.query(`
    // SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.*) AS comment_count
    // FROM articles
    // JOIN comments
    // ON comments.article_id = articles.article_id
    // GROUP BY articles.article_id
    // ORDER BY created_at DESC;`) 
    // .then((result) => {
    //     return result.rows; 
    // });

    return db.query(sqlString, queries)
    .then((result) => {
        return result.rows;
    })
    .catch((err) => {
        console.log(err);
    })
};

// exports.selectArticlesByTopic = ({ topic }) => {
//     return db.query(`
//     SELECT * FROM articles
//     WHERE articles.topic = $1;`), [topic]
//     .then((articles) => {
//         return articles.rows;
//     });
// };



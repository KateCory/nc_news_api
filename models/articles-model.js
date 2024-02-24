const db = require('../db/connection');

exports.selectArticleById = (article_id) => {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
      .then((result) => {
        if (!result.rows.length) {
            return Promise.reject({
              status: 404,
              msg: `No article found for ${article_id}`,
            });
          }
        return result.rows[0];
    });
};

exports.amendArticleById = ({ inc_votes, article_id }) => {
  return db
    .query(`UPDATE articles 
     SET votes = votes + $1
     WHERE articles.article_id = $2
     RETURNING *;`, [inc_votes, article_id] )
    .then((result) => {
      return result.rows[0];
    });
};




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


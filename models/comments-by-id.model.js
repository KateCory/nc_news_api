const db = require('../db/connection');

exports.selectCommentsById = (article_id) => {
    return db.query(`
    SELECT * FROM comments 
    WHERE comments.article_id = $1;`, [article_id])
    .then((result) => {
        if (!result.rows.length) {
            return Promise.reject({
              status: 404,
              msg: `No comments found for ${article_id}`,
            });
          }
        return result.rows;
    })
}


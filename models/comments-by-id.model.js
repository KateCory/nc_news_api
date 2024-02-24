const { response } = require('../app');
const db = require('../db/connection');
const { toLocaleString } = require('../db/data/test-data/topics');

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
    });
};

exports.insertCommentById = ( { article_id, author, body }) => {
  if(!article_id || !author || !body) {
    return Promise.reject({ status: 400, msg: 'Bad request'});
  }
  return db.query(`
  INSERT INTO comments (article_id, author, body) 
  VALUES ($1, $2, $3)
  RETURNING *;`, 
  [article_id, author, body])
  .then((result) => {
    return result.rows[0];
  });
};

exports.removeCommentById = ({ comment_id }) => {
  return db
  .query(`
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`, [comment_id])
  .then((result) => {
    const comment = result.rows[0];
    if(!comment) {
        return Promise.reject({ 
          status: 404, 
          msg: 'comment does not exist'
        });
    }
    return comment;
  });
};
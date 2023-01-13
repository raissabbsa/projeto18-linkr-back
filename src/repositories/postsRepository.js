import { connectionDB } from "../database/db.js";

export function createPost(user, infos, data) {
  return connectionDB.query(
    `
    INSERT INTO posts (user_id, description, likes, comments, reposts, link, link_title, link_description, link_image)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [user.id, infos.description, 0, 0, 0, infos.link, data.title, data.description, data.icon]
  );
}

export function getPost(myId) {
  return connectionDB.query(`
    SELECT posts.*,
    users.picture_url AS picture_user,
    users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    JOIN followers f ON follower_id=$1 AND f.following_id=users.id
    ORDER BY posts.id DESC
    LIMIT 20`,
    [myId]
  );
}

export function updatePost(body) {
  return connectionDB.query(
    `UPDATE posts
        SET description = $1 WHERE id = $2`,
    [body.description, body.id]
  );
}

export function deletePost(id) {
  return connectionDB.query(
    `DELETE FROM posts WHERE id = $1`,
    [id]
  );
}

export function deleteHashtags(id) {
  return connectionDB.query(
    `DELETE FROM hashtag_post WHERE post_id = $1`,
    [id]
  );
}

export function getcomments(id) {
  return connectionDB.query(`
  SELECT post_comments.*,
  users.picture_url AS picture_user_comment,
  users.username AS username_comment
  FROM post_comments
  JOIN users ON post_comments.user_id = users.id
  WHERE post_id=$1
  ORDER BY post_comments.id`,[id]);
}
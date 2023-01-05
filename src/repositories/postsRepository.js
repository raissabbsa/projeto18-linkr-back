import { connectionDB } from "../database/db.js";

export function createPost(user, infos) {
  return connectionDB.query(
    `
    INSERT INTO posts (user_id, link, description, likes) 
        VALUES ($1, $2, $3, $4)`,
        [user.id, infos.link, infos.description, 0]
  );
}

export function getPost() {
  return connectionDB.query(`
    SELECT posts.*, 
    users.picture_url AS picture_user,
    users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.id DESC
    LIMIT 20`);
}

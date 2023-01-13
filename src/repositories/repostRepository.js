import { connectionDB } from "../database/db.js";

export function checkPost(id) {
    return connectionDB.query(`SELECT * FROM posts WHERE id=$1`, [id]);
}

export function insertRepost(user_id, post_id) {
    return connectionDB.query(`INSERT INTO reposts (user_id, post_id) VALUES ($1,$2)`,[user_id, post_id]);
}

export function updateRepostPost(post_id, repost) {
    return connectionDB.query(`UPDATE posts SET reposts=$1 WHERE id=$2`, [Number(repost)+1, post_id]);

}

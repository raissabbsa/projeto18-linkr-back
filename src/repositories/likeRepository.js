import { connectionDB } from "../database/db.js";

async function likePost(postId, userId){
    return connectionDB.query(`INSERT INTO likes ("post_id", "user_id") VALUES ($1, $2);`, [postId, userId]);
}

export { likePost };
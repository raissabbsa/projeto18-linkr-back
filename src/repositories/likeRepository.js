import { connectionDB } from "../database/db.js";

async function likePost(postId, userId){
    return connectionDB.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [postId, userId]);
}

async function dislikePost(postId, userId) {
    return connectionDB.query( `DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`, [postId, userId]);
}

export { likePost, dislikePost };
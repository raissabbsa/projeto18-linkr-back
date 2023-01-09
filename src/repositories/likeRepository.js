import { connectionDB } from "../database/db.js";

async function likePost(postId, userId){
    return connectionDB.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [postId, userId]);
}

async function dislikePost(postId, userId) {
    return connectionDB.query( `DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`, [postId, userId]);
}

async function getPostLikes(postId, userId){
    return connectionDB.query(`SELECT users.username, users.id
    FROM likes JOIN users ON users.id = likes.user_id
    WHERE likes.post_id = $2 AND users.id != $1`,[userId, postId],);
}

async function likedPost(postId, userId){
    const result = await connectionDB.query(`SELECT * FROM likes WHERE post_id = $1 AND user_id = $2`,[userId, postId],);
    return result.rowCount;
}

export { likePost, dislikePost, getPostLikes, likedPost };
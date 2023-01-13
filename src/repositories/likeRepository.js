import { connectionDB } from "../database/db.js";

async function likePost(postId, userId){
    return connectionDB.query(`INSERT INTO likes (post_id, user_id) VALUES ($1, $2);`, [postId, userId]);
}

async function dislikePost(postId, userId) {
    return connectionDB.query(`DELETE FROM likes WHERE post_id = $1 AND user_id = $2;`, [postId, userId]);
}

async function userLiked(postId, userId) {
    return connectionDB.query(`
    SELECT users.username FROM likes
    JOIN users ON likes.user_id" = users.id
    WHERE likes.post_id = $1 AND likes.user_id = $2;`, [postId, userId]);
}

async function getPostLikes(postId, userId){
    return connectionDB.query(`SELECT users.username
    FROM likes JOIN users ON users.id = likes.user_id
    WHERE likes.post_id = $1 AND user_id != $2
    ORDER BY likes.id DESC LIMIT 2`,[postId, userId]);
}

async function qtdLikes(postId) {
    const likes = connectionDB.query(`SELECT COUNT(*) FROM likes
    WHERE post_id = $1;`, [postId]);
    
    return likes.rows[0].count;
}

export { likePost, dislikePost, userLiked, getPostLikes, qtdLikes };
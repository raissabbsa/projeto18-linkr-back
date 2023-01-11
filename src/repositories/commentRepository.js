import { connectionDB } from "../database/db.js";

export function getPost(id){
    return connectionDB.query(`SELECT * FROM posts WHERE id=$1`,[id]);
}

export function insertComment(post_id, user_id, comment){
    return connectionDB.query(`
        INSERT INTO post_comments (post_id, user_id, comment) VALUES ($1,$2,$3)`,
        [post_id, user_id, comment]);
}
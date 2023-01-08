import { connectionDB } from "../database/db.js";

export function getPostsByHashtag(hashtag){
    return connectionDB.query(`
        SELECT posts.*, users.picture_url AS picture_user, users.username
        FROM posts JOIN users ON posts.user_id = users.id
        JOIN hashtag_post hp ON posts.id = hp.post_id
        JOIN hashtags ON hashtags.id = hp.hashtag_id
        WHERE hashtags.name = $1
        ORDER BY posts.id DESC
    `, [hashtag]);
}
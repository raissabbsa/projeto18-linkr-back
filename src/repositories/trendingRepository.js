import { connectionDB } from "../database/db.js";

export function insertHashtag(hashtag){
    return connectionDB.query(`INSERT INTO hashtags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, [hashtag]);
}
export function getPostId(){
    return connectionDB.query(`SELECT MAX(id) as "post_id" FROM posts`);
}
export function getHashtagId(hashtag){
    return connectionDB.query(`SELECT id FROM hashtags WHERE name=$1`, [hashtag]);
}
export function insertPostHashtag(post_id, hashtag_id){
    return connectionDB.query(`
        INSERT INTO hashtag_post (post_id, hashtag_id)
        VALUES ($1, $2)`, [post_id, hashtag_id]
    );
}
export function getHashtags(){
    return connectionDB.query(`
        SELECT name, COUNT(hashtag_id) as "hashtag_quantity"
        FROM hashtags JOIN hashtag_post hp
        ON hashtags.id = hp.hashtag_id
        GROUP BY name
        ORDER BY hashtag_quantity DESC
        LIMIT 10
    `);
}
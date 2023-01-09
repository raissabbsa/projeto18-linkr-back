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

export function getHashtagPost(id){
    return connectionDB.query(`SELECT * FROM hashtag_post WHERE hashtag_id=$1`, [id]);
}

export function getHashtag(hashtag){
    return connectionDB.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtag]);
}


export function deleteHashtag(id){
    return connectionDB.query(`
        DELETE FROM hashtags WHERE id=$1`, 
        id);
}

export function deleteHashtagPost(id){
    return connectionDB.query(`
        DELETE FROM hashtag_post WHERE hashtag_id=$1`, 
        [id]);
}

export function insertHashtagPost(post_id, hashtag_id){
    return connectionDB.query(`
        INSERT INTO hashtag_post (post_id, hashtag_id) VALUES ($1, $2)`, 
        [post_id, hashtag_id]);
}

export function insertHashtag(name){
    return connectionDB.query(`INSERT INTO hashtags (name) VALUES ($1)`, [name]);
}

export function verifyPost(id){
    return connectionDB.query(`SELECT * FROM posts WHERE id=$1`, [id]);
}


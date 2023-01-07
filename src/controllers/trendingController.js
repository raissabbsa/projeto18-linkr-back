import { connectionDB } from "../database/db.js";

export async function postHashtags(req, res){
    const hashtags = req.body;

    try{
        for(const hashtag of hashtags){
            await connectionDB.query(`INSERT INTO hashtags (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`, [hashtag]);
            
            const post_id = await connectionDB.query(`SELECT MAX(id) as "post_id" FROM posts`);
            const hashtag_id = await connectionDB.query(`SELECT id FROM hashtags WHERE name=$1`, [hashtag]);
            const post_idNumber = post_id.rows[0].post_id;
            const hashtag_idNumber = hashtag_id.rows[0].id;

            await connectionDB.query(`
                INSERT INTO hashtag_post (post_id, hashtag_id) 
                VALUES ($1, $2)`, [post_idNumber, hashtag_idNumber]
            );
        };
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function sendHashtags(req, res){
    try{
        const allHashtags = await connectionDB.query(`SELECT name FROM hashtags`);
        const arrayHashtags = allHashtags.rows.map(item => item.name);
        res.send(arrayHashtags);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
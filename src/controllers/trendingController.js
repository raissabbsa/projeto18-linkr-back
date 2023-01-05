import { connectionDB } from "../database/db.js";

export async function postHashtags(req, res){
    const hashtags = req.body;

    try{
        hashtags.forEach(async hashtag => {

            const isThereHashtag = await connectionDB.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtag]);
            if (isThereHashtag.rows[0] === undefined){
                await connectionDB.query(`INSERT INTO hashtags (name) VALUES ($1)`, [hashtag]);
            }

            const hashtag_id = await connectionDB.query(`SELECT id FROM hashtags WHERE name=$1`, [hashtag]);
            const post_id = await connectionDB.query(`SELECT MAX(id) as "post_id" FROM posts`);
            await connectionDB.query(`
                INSERT INTO hashtag_post (post_id, hashtag_id) 
                VALUES ($1, $2)`, [post_id.rows[0].post_id, hashtag_id.rows[0].id]
            );

        });
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
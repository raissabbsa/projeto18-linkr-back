import { connectionDB } from "../database/db.js";
import { trendingSchema } from "../schemas/trendingSchema.js";

export async function postHashtags(req, res){
    const hashtags = req.body;

    console.log(hashtags);

    const {error} = trendingSchema.validate(hashtags, { abortEarly: false });
    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    hashtags.forEach(async hashtag => {
        try{
            const isThereHashtag = await connectionDB.query(`SELECT * FROM hashtags WHERE name=$1`, [hashtag]);
            
            console.log(isThereHashtag.rows[0]);

            if (isThereHashtag.rows[0] === undefined){
                await connectionDB.query(`INSERT INTO hashtags (name) VALUES ($1)`, [hashtag]);
            }

            const hashtag_id = await connectionDB.query(`SELECT id FROM hashtags WHERE name=$1`, [hashtag]);
            const post_id = await connectionDB.query(`SELECT MAX(id) as "post_id" FROM posts`);

            console.log([hashtag_id.rows, post_id.rows]);
            //await connectionDB.query(`INSERT INTO hashtag_post (post_id, hashtah_id) VALUES ($1, $2)`, [hashtag_id.rows[0], post_id.rows[0]]);

            res.sendStatus(201);
        }catch(err){
            console.log(err);
            res.sendStatus(500);
        }
    });
}
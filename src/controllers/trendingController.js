import { getHashtagId, getHashtags, getPostId, insertHashtag, insertPostHashtag } from "../repositories/trendingRepository.js";

export async function postHashtags(req, res){
    const hashtags = req.body;
    try{
        for(const hashtag of hashtags){
            await insertHashtag(hashtag);

            const post_id = await getPostId();
            const hashtag_id = await getHashtagId(hashtag);
            const post_idNumber = post_id.rows[0].post_id;
            const hashtag_idNumber = hashtag_id.rows[0].id;

            await insertPostHashtag(post_idNumber, hashtag_idNumber);
        };
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function sendHashtags(req, res){
    try{
        const allHashtags = await getHashtags();
        const arrayHashtags = allHashtags.rows.map(hashtag => hashtag.name);
        res.send(arrayHashtags);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
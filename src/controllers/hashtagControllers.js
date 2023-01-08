import { getPostsByHashtag } from "../repositories/hashtagRepository.js";

export async function sendPostsByHashtag(req, res){
    const { hashtag } = req.params;
    try{
        const posts = await getPostsByHashtag(hashtag);
        res.send(posts.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
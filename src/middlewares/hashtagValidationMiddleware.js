import { verifyPost } from "../repositories/hashtagRepository.js";

export async function hashtagValidation(req, res, next){
    const {post_id} = req.body;

    try{
        const existPost = await verifyPost(post_id);
        if(existPost.rows.length === 0){
            return res.sendStatus(404);
        }
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }

    next();

}

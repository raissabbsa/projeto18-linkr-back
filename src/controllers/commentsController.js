import { insertComment, updatePostComment } from "../repositories/commentRepository.js";
import { getPost } from "../repositories/postsRepository.js";

export async function postComment(req, res){
    const {post_id, comment} = req.body;
    const user = res.locals.user;

    try{
        const post = await getPost(post_id);        
        await insertComment(post_id, user.id, comment);
        await updatePostComment(Number(post.rows[0].comments) +1, post_id);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}


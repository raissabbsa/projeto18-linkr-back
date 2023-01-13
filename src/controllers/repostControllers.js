import { checkPost, insertRepost, updateRepostPost } from "../repositories/repostRepository.js";

export async function postRepost(req, res){
    const user = res.locals.user;
    const {post_id} = req.body;
    try{
        const existPost = await checkPost(post_id);
        if(existPost.rows.length === 0){
            return res.sendStatus(404);
        }
        await insertRepost(user.id, post_id); 
        await updateRepostPost(post_id, existPost.rows[0].reposts);
        res.sendStatus(201);

    }catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}

import { likePost } from "../repositories/likeRepository.js";

async function like(req, res){
    const { postId } = req.body;
    const userId = res.locals.user;

    try {
        await likePost(postId, userId);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

export { like };
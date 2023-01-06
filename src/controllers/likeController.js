import { likePost, dislikePost } from "../repositories/likeRepository.js";

async function like(req, res){
    const { postId } = req.body;
    const user = res.locals.user;

    try {
        await likePost(postId, user.id);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

async function dislike(req, res) {
    const { id } = req.params;
    const user = res.locals.user;
    try {
        await dislikePost(id, user.id);
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

export { like, dislike };
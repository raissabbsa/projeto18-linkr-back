import { likePost, dislikePost, getPostLikes, likedPost } from "../repositories/likeRepository.js";

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

async function getLikes(req, res){
    const { postId } = req.body;
    const user = res.locals.user;
    try {
        const likes = await getPostLikes(postId, user.id);
        res.send(likes).status(200);
    } catch {
        res.sendStatus(500);
    }
}

async function getIsLiked(req, res){
    const { postId } = req.body;
    const user = res.locals.user;

    try {
        const liked = likedPost(postId, user.id);
        res.send(liked).status(200);
    } catch {
        res.sendStatus(500);
    }
}

export { like, dislike, getLikes, getIsLiked };
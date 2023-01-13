import { likePost, dislikePost, getPostLikes, userLiked, qtdLikes } from "../repositories/likeRepository.js";

async function like(req, res){
    const { postId } = req.params;
    const { user } = res.locals.user;

    try {
        await likePost(postId, user.id);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

async function dislike(req, res) {
    const { postId } = req.params;
    const { user } = res.locals.user;
    try {
        await dislikePost(postId, user.id);
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

async function getLikes(req, res){
    const { postId } = req.params;
    const { user } = res.locals.user;
    let liked = false;
    try{
        const userLike = await userLiked(postId, user.id)
        const allLikes = await getPostLikes(postId, user.id);
        const likes = await qtdLikes(postId);
        if (userLike.rows.length > 0) {
            liked = true;
            allLikes.rows.unshift({username: "Você"});
        }
        res.json({ likesUsers: allLikes.rows, liked, likes });
    }
    catch(error){
        res.sendStatus(500);
    }
}

export { like, dislike, getLikes };
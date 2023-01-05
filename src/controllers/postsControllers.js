import { postSchema } from "../schemas/postSchema.js";
import { createPost, getPost, updatePost } from "../repositories/postsRepository.js";
import { connectionDB } from "../database/db.js";

export async function postPosts(req, res){
    const user = res.locals.user;
    const infos = req.body;

    const {error} = postSchema.validate(infos, { abortEarly: false });
    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    try{
        await createPost(user, infos);
        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getPosts(req, res){
    try{
        const posts = await getPost();
        res.send(posts.rows);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updatePosts(req, res){
    const user = res.locals.user;
    const body = req.body;
    try{
        await updatePost(body)
        res.sendStatus(200)
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
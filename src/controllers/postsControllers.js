import { postSchema } from "../schemas/postSchema.js";
import { createPost } from "../repositories/postsRepository.js";
import { connectionDB } from "../database/db.js";

export async function postPosts(req, res){
    console.log(res.locals.user)
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
        const posts = await connectionDB.query(`
            SELECT posts.*, 
            users.picture_url AS picture_user,
            users.username
            FROM posts
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.id DESC
            LIMIT 20`);

        res.send(posts.rows);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
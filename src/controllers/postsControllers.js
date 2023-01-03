import { postSchema } from "../schemas/postSchema.js";
import { createPost } from "../repositories/postsRepository.js";

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
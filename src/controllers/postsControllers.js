import { postSchema } from "../schemas/postSchema.js";
import { createPost, deleteHashtags, deletePost, getcomments, getPost, updatePost } from "../repositories/postsRepository.js";
import getMetaData from 'metadata-scraper';
import { connectionDB } from "../database/db.js";

export async function postPosts(req, res){
    const user = res.locals.user;
    const infos = req.body;

    const {error} = postSchema.validate(infos, { abortEarly: false });
    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    const data = await getMetaData(infos.link);
    if(data.title === undefined) {
        data.title = data.provider;
    }
    // console.log(data);

    try{
        await createPost(user, infos, data);
        res.sendStatus(201);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function getPosts(req, res){
    try{
        const posts = await getPost();

        const postcomments = [];
        for(let i=0; i< posts.rows.length;i++){
            const commentbyPost = await getcomments(posts.rows[i].id);
            postcomments.push({
                ...posts.rows[i],
                comments: commentbyPost.rows

            })
        }
        res.send(postcomments);

    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function updatePosts(req, res){
    const body = req.body;
    try{
        await updatePost(body)
        res.sendStatus(200)
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deletePosts(req, res){
    const id = req.params.id;

    try{
        await deleteHashtags(id);
        await deletePost(id);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}
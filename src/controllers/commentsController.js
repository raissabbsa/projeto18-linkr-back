import { connectionDB } from "../database/db.js";
import { insertComment } from "../repositories/commentRepository.js";

export async function postComment(req, res){
    const {post_id, comment} = req.body;
    const user = res.locals.user;

    try{
        
        await insertComment(post_id, user.id, comment);
        res.sendStatus(201);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}


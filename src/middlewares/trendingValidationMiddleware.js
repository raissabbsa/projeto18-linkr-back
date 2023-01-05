import { trendingSchema } from "../schemas/trendingSchema.js";
 
export async function trendingValidation(req, res, next){
    const hashtags = req.body;

    const {error} = trendingSchema.validate(hashtags, { abortEarly: false });
    if(error){
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}
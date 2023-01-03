import joi from "joi";

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string()
});
import joi from "joi";

export const userSignUpSchema = joi.object({
	email: joi.string().email().required(),
	password: joi.string().required(),
	username: joi.string().required().min(3),
	picture_url: joi.string().uri().required()
});

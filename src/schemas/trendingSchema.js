import joi from "joi";

export const trendingSchema = joi.array().items(
    joi.string()
);
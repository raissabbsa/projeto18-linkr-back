import { Router } from "express";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
import { sendPostsByHashtag, updateHashtag } from "../controllers/hashtagControllers.js";
import { hashtagValidation } from "../middlewares/hashtagValidationMiddleware.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag', authValidation, sendPostsByHashtag);
hashtagRouter.put('/hashtag', authValidation, hashtagValidation ,updateHashtag);

export default hashtagRouter;
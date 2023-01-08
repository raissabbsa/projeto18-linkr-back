import { Router } from "express";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
import { sendPostsByHashtag } from "../controllers/hashtagControllers.js";

const hashtagRouter = Router();

hashtagRouter.get('/hashtag/:hashtag', authValidation, sendPostsByHashtag);

export default hashtagRouter;
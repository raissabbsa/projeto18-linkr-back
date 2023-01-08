import { Router } from "express";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
//import { hashtagValidation } from "../middlewares/hashtagValidationMiddleware.js";
import { sendPostsByHashtag } from "../controllers/hashtagControllers.js";

const trendingRouter = Router();

trendingRouter.get('/hashtag/:hashtag', authValidation, sendPostsByHashtag);

export default trendingRouter;
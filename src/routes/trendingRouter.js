import { Router } from "express";
import { postHashtags, sendHashtags } from "../controllers/trendingController.js";
import { trendingValidation } from "../middlewares/trendingValidationMiddleware.js";

const trendingRouter = Router();

trendingRouter.post("/trending", trendingValidation, postHashtags);
trendingRouter.get('/trending', sendHashtags);

export default trendingRouter;
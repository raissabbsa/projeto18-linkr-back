import { Router } from "express";
import { postHashtags, sendHashtags } from "../controllers/trendingController.js";
import { trendingValidation } from "../middlewares/trendingValidationMiddleware.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const trendingRouter = Router();

trendingRouter.post("/trending", authValidation, trendingValidation, postHashtags);
trendingRouter.get('/trending', authValidation, sendHashtags);

export default trendingRouter;
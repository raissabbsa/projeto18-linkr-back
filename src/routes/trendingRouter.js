import { Router } from "express";
import { postHashtags } from "../controllers/trendingController.js";

const trendingRouter = Router();

trendingRouter.post("/trending", postHashtags);

export default trendingRouter;
import { Router } from "express";
import { getPosts, postPosts } from "../controllers/postsControllers.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, postPosts);
postsRouter.get("/posts", getPosts)

export default postsRouter;
import { Router } from "express";
import { getPosts, postPosts, updatePosts } from "../controllers/postsControllers.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, postPosts);
postsRouter.get("/posts", authValidation, getPosts);
postsRouter.put("/posts", authValidation, updatePosts)

export default postsRouter;
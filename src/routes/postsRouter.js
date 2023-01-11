import { Router } from "express";
import { deletePosts, getPosts, postPosts, updatePosts } from "../controllers/postsControllers.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, postPosts);
postsRouter.get("/posts", authValidation, getPosts);
postsRouter.put("/posts", authValidation, updatePosts);
postsRouter.delete("/posts/:id", authValidation, deletePosts);

export default postsRouter;
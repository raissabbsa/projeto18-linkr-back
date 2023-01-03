import { Router } from "express";
import { postPosts } from "../controllers/postsControllers.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const postsRouter = Router();

postsRouter.post("/posts", authValidation, postPosts);

export default postsRouter;
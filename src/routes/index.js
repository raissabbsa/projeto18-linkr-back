import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import likeRouter from "./likeRouter.js";
import trendingRouter from "./trendingRouter.js";
import hashtagRouter from "./hashtagRouter.js";
import commentRouter from "./commentsRouter.js";

const router = Router();
router.use(usersRouter);
router.use(postsRouter);
router.use(likeRouter);
router.use(trendingRouter);
router.use(hashtagRouter);
router.use(commentRouter);

export default router;

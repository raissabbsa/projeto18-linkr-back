import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import trendingRouter from "./trendingRouter.js";

const router = Router();
router.use(usersRouter);
router.use(postsRouter);
router.use(trendingRouter);

export default router;

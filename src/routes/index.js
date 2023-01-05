import { Router } from "express";
import usersRouter from "./usersRouter.js";
import postsRouter from "./postsRouter.js";
import likeRouter from "./likeRouter.js";

const router = Router();
router.use(usersRouter);
router.use(postsRouter);
router.use(likeRouter);

export default router;

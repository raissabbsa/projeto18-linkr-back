import { Router } from "express";
import { postComment } from "../controllers/commentsController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const commentRouter = Router();

commentRouter.post("/comments",authValidation ,postComment);

export default commentRouter;


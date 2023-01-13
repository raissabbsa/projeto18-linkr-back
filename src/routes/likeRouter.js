import { Router } from "express";
import { like, dislike, getLikes } from "../controllers/likeController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/like/:postId", authValidation, like);
likeRouter.post("/dislike/:postId", authValidation, dislike);
likeRouter.get("/likes/:postId", authValidation, getLikes);

export default likeRouter;
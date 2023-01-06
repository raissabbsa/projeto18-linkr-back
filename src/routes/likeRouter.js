import { Router } from "express";
import { like, dislike } from "../controllers/likeController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/like", authValidation, like);
likeRouter.delete("/dislike/:id", authValidation, dislike);

export default likeRouter;
import { Router } from "express";
import { like } from "../controllers/likeController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const likeRouter = Router();

likeRouter.post("/like", authValidation, like);

export default likeRouter;
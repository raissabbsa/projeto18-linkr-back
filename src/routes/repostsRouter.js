import { Router } from "express";
import { postRepost } from "../controllers/repostControllers.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";

const repostRouter = Router();

repostRouter.post("/repost", authValidation,postRepost); 

export default repostRouter;


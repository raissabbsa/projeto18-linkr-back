import { Router } from "express";
import { searchUsers, signIn, signUp, sendPostsByUser, followStatus, follow, unfollow, getFollowers } from "../controllers/usersController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
import { signInValidation } from "../middlewares/signInValidationMiddleware.js";
import { signUpValidation } from "../middlewares/signUpValidationMiddleware.js";

const usersRouter = Router();

usersRouter.post("/signin", signInValidation, signIn);
usersRouter.post("/signup", signUpValidation, signUp);
usersRouter.get("/user/search", authValidation, searchUsers)
usersRouter.get("/user/:id", authValidation, sendPostsByUser)
usersRouter.get("/user/:id/status", authValidation, followStatus)
usersRouter.get("/user/:id/follow", authValidation, follow)
usersRouter.get("/user/:id/unfollow", authValidation, unfollow)
usersRouter.get("/followers", authValidation, getFollowers)

export default usersRouter;

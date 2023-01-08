import { Router } from "express";
import { searchUsers, signIn, signUp } from "../controllers/usersController.js";
import { signInValidation } from "../middlewares/signInValidationMiddleware.js";
import { signUpValidation } from "../middlewares/signUpValidationMiddleware.js";

const usersRouter = Router();

usersRouter.post("/signin", signInValidation, signIn);
usersRouter.post("/signup", signUpValidation, signUp);
usersRouter.get("/users/search", searchUsers)

export default usersRouter;

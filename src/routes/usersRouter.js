import { Router } from "express";
import { searchUsers, signIn, signUp, sendPostsByUser } from "../controllers/usersController.js";
import { authValidation } from "../middlewares/authValidationMiddleware.js";
import { signInValidation } from "../middlewares/signInValidationMiddleware.js";
import { signUpValidation } from "../middlewares/signUpValidationMiddleware.js";

const usersRouter = Router();

usersRouter.post("/signin", signInValidation, signIn);
usersRouter.post("/signup", signUpValidation, signUp);
usersRouter.get("/users/search", searchUsers)
usersRouter.get("/user/:id", authValidation, sendPostsByUser)

export default usersRouter;

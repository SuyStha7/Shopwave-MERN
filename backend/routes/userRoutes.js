import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  allUsersController,
} from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// {{baseUrl}}/users/register
userRouter.post("/register", registerController);

// {{baseUrl}}/users/login
userRouter.post("/login", loginController);

// {{baseUrl}}/users/logout
userRouter.get("/logout", logoutController);

// Admin routes
// {{baseUrl}}/users/all-users
userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;

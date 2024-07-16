import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  allUsersController,
} from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { forgetPassword } from "../helper/userHelper.js";

const userRouter = express.Router();

// {{baseUrl}}/users/register
userRouter.post("/register", registerController);

// {{baseUrl}}/users/login
userRouter.post("/login", loginController);

// {{baseUrl}}/users/logout
userRouter.get("/logout", logoutController);

// {{baseUrl}}/users/forget-password
userRouter.post("/forget-password", forgetPassword);

// {{baseUrl}}/users/reset-password
// userRouter.post("/reset-password", resetPassword);

// Admin routes
// {{baseUrl}}/users/all-users
userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;

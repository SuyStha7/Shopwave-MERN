import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  allUsersController,
  saveToCart,
  getFromCart,
} from "../controllers/userController.js";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import { forgetPassword } from "../helper/userHelper.js";

const userRouter = express.Router();

// POST {{baseUrl}}/users/register
userRouter.post("/register", registerController);

// POST {{baseUrl}}/users/login
userRouter.post("/login", loginController);

// GET {{baseUrl}}/users/logout
userRouter.get("/logout", logoutController);

// POST {{baseUrl}}/users/cart/:userId
userRouter.post("/cart/:id", saveToCart);

// GET {{baseUrl}}/users/cart/:userId
userRouter.get("/cart/:id", getFromCart);

// POST {{baseUrl}}/users/forget-password
userRouter.post("/forget-password", forgetPassword);

// Admin routes

// GET {{baseUrl}}/users/all-users
userRouter.get("/all-users", isAuthorized, isAdmin, allUsersController);

export default userRouter;

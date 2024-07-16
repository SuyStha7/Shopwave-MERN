import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  getAllCategoriesController,
  getSingleCategoryController,
  updateCategoryController,
} from "../controllers/categoriesController.js";

const categoriesRouter = express.Router();

// {{baseUrl}}/categories/getCategory
categoriesRouter.get("/getCategory", getAllCategoriesController);

// Admin routes
// {{baseUrl}}/categories/addCategory
categoriesRouter.post(
  "/addCategory",
  isAuthorized,
  isAdmin,
  createCategoryController
);

// {{baseUrl}}/categories/delCategory/boc
categoriesRouter.delete(
  "/delCategory/:slug",
  isAuthorized,
  isAdmin,
  deleteCategoryController
);

// {{baseUrl}}/categories/getSingleCategory/boc
categoriesRouter.get("/getSingleCategory/:slug", getSingleCategoryController);

// {{baseUrl}}/categories/updateCategory/boc
categoriesRouter.put(
  "/updateCategory/:slug",
  isAuthorized,
  isAdmin,
  updateCategoryController
);

export default categoriesRouter;

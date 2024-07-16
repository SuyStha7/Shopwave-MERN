import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  addProductController,
  deleteProductController,
  getAllProductsController,
  getSingleProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const productsRouter = express.Router();

// {{baseUrl}}/products/getProduct
productsRouter.get("/getProduct", getAllProductsController);

// {{baseUrl}}/products/searchProduct
productsRouter.get("/searchProduct", searchProductController);

// Admin routes
// {{baseUrl}}/products/addProduct
productsRouter.post(
  "/addProduct",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addProductController
);

// {{baseUrl}}/products/delProduct/productId
productsRouter.delete(
  "/delProduct/:productId",
  isAuthorized,
  isAdmin,
  deleteProductController
);

// {{baseUrl}}/products/getSingleProduct/productId
productsRouter.get("/getSingleProduct/:productId", getSingleProductController);

// {{baseUrl}}/products/updateProduct/productId
productsRouter.put(
  "/updateProduct/:productId",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  updateProductController
);

export default productsRouter;

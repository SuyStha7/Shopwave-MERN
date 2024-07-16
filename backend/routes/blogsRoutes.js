import express from "express";
import { isAdmin, isAuthorized } from "../middlewares/authMiddleware.js";
import {
  addBlogController,
  deleteBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
} from "../controllers/blogsController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const blogRouter = express.Router();

// {{baseUrl}}/blogs/getBlog
blogRouter.get("/getBlog", getAllBlogsController);

// {{baseUrl}}/blogs/addBlog
blogRouter.post(
  "/addBlog",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  addBlogController
);

// {{baseUrl}}/blogs/getSingleBlog/:blogId
blogRouter.get("/getSingleBlog/:blogId", getSingleBlogController);

// {{baseUrl}}/blogs/updateBlog/blogId
blogRouter.put(
  "/updateBlog/:blogId",
  upload.single("picture"),
  isAuthorized,
  isAdmin,
  updateBlogController
);

// {{baseUrl}}/blogs/deleteBlog/blogId
blogRouter.delete(
  "/deleteBlog/:blogId",
  isAuthorized,
  isAdmin,
  deleteBlogController
);

export default blogRouter;

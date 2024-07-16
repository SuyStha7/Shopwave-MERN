import blogsModel from "../models/blogsModel.js";
import {
  uploadImageOnCloudinary,
  deleteImageOnCloudinary,
} from "../helper/cloudinaryHelper.js";

const addBlogController = async (req, res) => {
  try {
    const { title, slug, content, excerpt } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;

    // Validate required fields
    if (!title || !slug || !content || !excerpt || !picture || !picturePath) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Upload image to Cloudinary
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "blogs"
    );

    if (!secure_url) {
      return res.status(400).json({
        success: false,
        message: "Error uploading image",
      });
    }

    // Create new blog entry
    const newBlog = await blogsModel.create({
      title,
      slug,
      content,
      excerpt,
      picture: {
        secure_url,
        public_id,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error(`addBlogController Error: ${error.message}`);
    return res.status(400).json({
      success: false,
      message: "Error in addBlogController",
      error: error.message,
    });
  }
};

const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogsModel.find({});

    return res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      total: blogs.length,
      blogs,
    });
  } catch (error) {
    console.error(`getAllBlogsController Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error in getAllBlogsController",
      error: error.message,
    });
  }
};

const getSingleBlogController = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog found successfully",
      blog,
    });
  } catch (error) {
    console.error(`getSingleBlogController Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error in getSingleBlogController",
      error: error.message,
    });
  }
};

const updateBlogController = async (req, res) => {
  try {
    const { blogId } = req.params;
    const { title, slug, content, excerpt } = req.body;
    const picture = req.file?.path;

    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Update blog fields
    if (title) blog.title = title;
    if (slug) blog.slug = slug;
    if (content) blog.content = content;
    if (excerpt) blog.excerpt = excerpt;

    // Update image if provided
    if (picture) {
      // Upload new image to Cloudinary
      const { secure_url, public_id } = await uploadImageOnCloudinary(
        image,
        "blogs"
      );

      // Delete previous image from Cloudinary
      if (blog.picture && blog.picture.public_id) {
        await deleteImageOnCloudinary(blog.picture.public_id);
      }

      blog.picture = {
        secure_url,
        public_id,
      };
    }

    // Save updated blog
    await blog.save();

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.error(`updateBlogController Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error in updateBlogController",
      error: error.message,
    });
  }
};

const deleteBlogController = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await blogsModel.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // Delete image from Cloudinary if exists
    if (blog.picture && blog.picture.public_id) {
      await deleteImageOnCloudinary(blog.picture.public_id);
    }

    // Delete blog from database
    await blogsModel.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(`deleteBlogController Error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Error in deleteBlogController",
      error: error.message,
    });
  }
};

export {
  addBlogController,
  getAllBlogsController,
  getSingleBlogController,
  updateBlogController,
  deleteBlogController,
};

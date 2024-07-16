import productsModel from "../models/productsModel.js";
import {
  uploadImageOnCloudinary,
  deleteImageOnCloudinary,
} from "../helper/cloudinaryHelper.js";

const addProductController = async (req, res) => {
  try {
    const { title, desc, category, price } = req.body;
    const picture = req.file?.fieldname;
    const picturePath = req.file?.path;

    // check if exists
    if (!title || !desc || !category || !price || !picture || !picturePath) {
      return res
        .status(400)
        .send({ success: false, message: "All fields are required" });
    }

    //uploading image on cloudinary
    const { secure_url, public_id } = await uploadImageOnCloudinary(
      picturePath,
      "products"
    );

    if (!secure_url) {
      return res.status(400).send({
        success: false,
        message: "Error while uploding image",
        error: secure_url,
      });
    }

    const product = await productsModel.create({
      title,
      desc,
      category,
      price,
      user: req.user._id,
      picture: {
        secure_url,
        public_id,
      },
    });

    return res.status(201).send({
      success: true,
      message: "Product uploded successfully",
      product,
    });
  } catch (error) {
    console.log(`addProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in addProductController",
      error,
    });
  }
};

const getAllProductsController = async (req, res) => {
  try {
    // Fetching products
    const products = await productsModel
      .find({})
      .populate("user", "name")
      .populate("category", "name");

    return res.status(201).send({
      success: true,
      message: "All products fetched successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.error(`getAllProductsController Error: ${error.message}`);
    return res.status(404).send({
      success: false,
      message: "Internal Server Error in getAllProductsController",
      error: error.message,
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    // Fetching product ID from request parameters
    const { productId } = req.params;

    // Fetching product from the database
    const product = await productsModel
      .findById(productId)
      .populate("user", "name")
      .populate("category", "name");

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    console.log(`getSingleProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in getSingleProductController",
      error: error.message,
    });
  }
};

const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { title, desc, category, price } = req.body;
    const picturePath = req.file?.path;

    // Fetching product from the database
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Updating product details
    if (title) product.title = title;
    if (desc) product.desc = desc;
    if (category) product.category = category;
    if (price) product.price = price;

    // Upload new image if present
    if (picturePath) {
      const { secure_url, public_id } = await uploadImageOnCloudinary(
        picturePath,
        "products"
      );

      // Delete previous image
      if (product.picture && product.picture.public_id) {
        await deleteImageOnCloudinary(product.picture.public_id);
      }

      product.picture = {
        secure_url,
        public_id,
      };
    }

    // Save updated product
    await product.save();

    return res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(`updateProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in updateProductController",
      error,
    });
  }
};

const deleteProductController = async (req, res) => {
  try {
    // Fetching product ID from request parameters
    const { productId } = req.params;

    // Fetching product from the database
    const product = await productsModel.findById(productId);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Delete image from cloudinary if exists
    if (product.picture && product.picture.public_id) {
      await deleteImageOnCloudinary(product.picture.public_id);
    }

    // Delete product from database
    await productsModel.findByIdAndDelete(productId);
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log(`deleteProductController Error: ${error}`);
    return res.status(400).send({
      success: false,
      message: "Error in deleteProductController",
      error: error.message,
    });
  }
};

const searchProductController = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Query parameter 'q' is required",
      });
    }

    // Escape special characters from the query string
    const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");

    // Perform case-insensitive search using Mongoose aggregation pipeline
    const products = await productsModel.aggregate([
      {
        $match: {
          $or: [
            { productName: { $regex: new RegExp(escapedQuery, "i") } },
            { category: { $regex: new RegExp(escapedQuery, "i") } },
          ],
        },
      },
    ]);

    return res.status(200).send({
      success: true,
      message: "Search product list",
      products: products,
    });
  } catch (error) {
    console.log(`searchProductController Error: ${error}`);
    return res.status(500).send({
      success: false,
      message: "Error in searchProductController",
      error: error.message,
    });
  }
};

export {
  addProductController,
  getAllProductsController,
  deleteProductController,
  getSingleProductController,
  updateProductController,
  searchProductController,
};

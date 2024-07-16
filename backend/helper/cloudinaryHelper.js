import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImageOnCloudinary = async (filePath, folderName) => {
  try {
    // uploading image from server
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
    });
    // delete image from server
    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log("Failed to delete from server", error);
    }

    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error(error);
  }
};

const deleteImageOnCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
export { uploadImageOnCloudinary, deleteImageOnCloudinary };

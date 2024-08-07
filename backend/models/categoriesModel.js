import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product"
    }]
  },
  { timestamps: true }
);

export default mongoose.model("Category", categoriesSchema);

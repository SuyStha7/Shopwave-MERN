import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const orderItemSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("OrderItem", orderItemSchema);
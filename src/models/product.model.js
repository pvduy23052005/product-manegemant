const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // tuy chỉnh khoảng trắng ở đầu và cuối
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,

      default: 0,
    },
    thumbnail: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    position: {
      type: Number,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

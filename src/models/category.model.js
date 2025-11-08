const mongoose = require("mongoose");

// Schema đơn giản
const categorySchema = new mongoose.Schema(
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
    parent_id: {
      type: String,
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
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slugPaddingSize: 4, // Thêm số nếu trùng (ví dụ: san-pham-0001)
    },
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

// Tạo Model từ Schema
const category = mongoose.model(
  "Category",
  categorySchema,
  "products-category"
);

module.exports = category;

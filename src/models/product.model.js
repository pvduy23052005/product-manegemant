const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // tuy chỉnh khoảng trắng ở đầu và cuối
    },
    category: {
      type: String,
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
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slugPaddingSize: 4, // Thêm số nếu trùng (ví dụ: san-pham-0001)
    },
    createBy: {
      account_id: String,
      createTime: {
        type: Date,
        default: Date.now(),
      },
    },
    deletedBy: {
      account_id: String,
      deletedTime: {
        type: Date,
        default: Date.now(),
      },
    },
    updatedBy: [
      {
        account_id: String,
        updatedTime: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true, // Tự động tạo createdAt và updatedAt
  }
);

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;

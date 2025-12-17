const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
    },
    cart_id: {
      type: String,
    },
    userInfo: {
      fullName: String,
      phone: Number,
      address: String,
      email: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        quantity: Number,
        discountPercentage: Number,
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema, "orders");

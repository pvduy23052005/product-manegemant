const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
    },
    otp: {
      type: String,
      require: true,
    },
    expireAt: {
      type: Date,
      default: () => new Date(Date.now() + 3 * 60 * 1000), // 3 phút
      index: { expires: 0 },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ForgotPassword",
  forgotPasswordSchema,
  "forget-passwords"
);

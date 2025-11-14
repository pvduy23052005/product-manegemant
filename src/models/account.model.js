const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    avartar: {
      type: String,
      default: "",
    },
    role_id: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    deleted : {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema, "accounts");

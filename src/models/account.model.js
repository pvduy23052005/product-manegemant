const mongoose = require("mongoose");
const randomstring = require("../helpers/random");

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
      default: randomstring.randomString(20),
    },
    avatar: {
      type: String,
    },
    role_id: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Account", accountSchema, "accounts");

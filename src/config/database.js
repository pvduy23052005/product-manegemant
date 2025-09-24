const mongoose = require("mongoose");

require("dotenv").config(); // load biến từ .env

module.exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

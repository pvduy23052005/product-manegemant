const mongoose = require("mongoose");

module.exports.connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://phungvanduy23052005:trpt1D9TU6BllRh6@product-managerment.webbk.mongodb.net/Data-base");

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

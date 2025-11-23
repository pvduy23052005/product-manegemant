const mongoose = require("mongoose");

module.exports.connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

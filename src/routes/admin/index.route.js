const routeDasshboard = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");
const auth = require("../../middlewares/admin/auth.middleware");

module.exports = (app) => {
  app.use("/admin" + "/dashboard", auth.authMiddleware, routeDasshboard);

  app.use("/admin" + "/product",  auth.authMiddleware,productRoute);

  app.use("/admin" + "/category",  auth.authMiddleware, categoryRoute);

  app.use("/admin" + "/role",  auth.authMiddleware, roleRoute);

  app.use("/admin" + "/account",  auth.authMiddleware, accountRoute);

  app.use("/admin" + "/auth", authRoute);
};

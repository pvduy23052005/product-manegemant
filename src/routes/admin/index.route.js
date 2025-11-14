const routeDasshboard = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const roleRoute = require("./role.route");
const authRoute = require("./auth.route");
const accountRoute = require("./account.route");

module.exports = (app) => {
  app.use("/admin", routeDasshboard);

  app.use("/admin" + "/product", productRoute);

  app.use("/admin" + "/category", categoryRoute);

  app.use("/admin" + "/role", roleRoute);

  app.use("/admin" + "/auth", authRoute);

  app.use("/admin" + "/account", accountRoute);
};

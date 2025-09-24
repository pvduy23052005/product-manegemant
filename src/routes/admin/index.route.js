const routeDasshboard = require("./dashboard.route");
const productRoute = require("./product.route");

module.exports = (app) => {
  app.use("/admin", routeDasshboard);

  app.use("/admin" + "/product", productRoute);
};

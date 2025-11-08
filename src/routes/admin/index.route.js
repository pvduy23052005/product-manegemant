const routeDasshboard = require("./dashboard.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");

module.exports = (app) => {
  app.use("/admin", routeDasshboard);

  app.use("/admin" + "/product", productRoute);

  app.use("/admin" + "/category" , categoryRoute); 
};

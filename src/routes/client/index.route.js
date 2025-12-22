const routeHome = require("./home.route");
const cartMiddlewares = require("../../middlewares/client/cart.middlewares");
const routeCart = require("./cart.route");
const routeCheckout = require("./checkout.route");
const routeUser = require("./user.route");
const userMiddleware = require("../../middlewares/client/user.middleware");
const categoryRoute = require("./category.route");
const routeOrder = require("./order.route");

module.exports = (app) => {
  app.use(cartMiddlewares.cartMiddlewares, userMiddleware.userMiddleware);

  app.use("/", routeHome);

  app.use("/cart", routeCart);

  app.use("/checkout", routeCheckout);

  app.use("/user", routeUser);

  app.use("/category", categoryRoute);

  app.use("/order", routeOrder);
};

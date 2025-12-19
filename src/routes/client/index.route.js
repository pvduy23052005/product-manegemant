const routeHome = require("./home.route");
const cartMiddlewares = require("../../middlewares/client/cart.middlewares");
const routeCart = require("./cart.route");
const routeCheckout = require("./checkout.route");
const routeUser = require("./user.route");

module.exports = (app) => {
  app.use(cartMiddlewares.cartMiddlewares);

  app.use("/", routeHome);

  app.use("/cart", routeCart);

  app.use("/checkout", routeCheckout);

  app.use("/user", routeUser);
};

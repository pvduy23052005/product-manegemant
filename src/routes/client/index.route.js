const routeHome = require("./home.route");
const cartMiddlewares = require("../../middlewares/client/cart.middlewares");
const routeCart = require("./cart.route");

module.exports = (app) => {
  app.use(cartMiddlewares.cartMiddlewares);

  app.use("/", routeHome);

  app.use("/cart" , routeCart);
};

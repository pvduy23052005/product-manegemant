const routeHome = require("./home.route");

module.exports = (app) => {
  app.use("/", routeHome);
};

const routeDasshboard = require("./dashboard.route");

module.exports = (app) => {
  app.use("/admin", routeDasshboard);
};

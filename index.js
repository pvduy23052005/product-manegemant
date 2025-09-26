const express = require("express");
const path = require("path");
const routeAddmin = require("./src/routes/admin/index.route");
require("dotenv").config();
const Database = require("./src/config/database");
const methodOverride = require("method-override");

const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

Database.connectDatabase();
routeAddmin(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require("express");
const path = require("path");
const routeAddmin = require("./src/routes/admin/index.route");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));

routeAddmin(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

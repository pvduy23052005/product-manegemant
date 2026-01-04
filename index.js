const express = require("express");
const path = require("path");
require("dotenv").config();

const routeAdmin = require("./src/routes/admin/index.route.js");
const routeClient = require("./src/routes/client/index.route.js");
const Database = require("./src/config/database");

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5555;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("error");
  next();
});

Database.connectDatabase();
routeAdmin(app);
routeClient(app);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});

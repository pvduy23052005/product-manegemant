const express = require("express");
const path = require("path");
const routeAddmin = require("./src/routes/admin/index.route");
const routeClient = require("./src/routes/client/index.route.js");
require("dotenv").config();
const Database = require("./src/config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
require("dotenv").config(); // load biến từ .env
const session = require("express-session");
const flash = require("express-flash"); // Import express-flash
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "src", "views"));
app.use(express.static(path.join(__dirname, "src", "public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/tinymce",
  express.static(path.join(__dirname, ".", "node_modules", "tinymce"))
);
app.use(cookieParser());

app.use(
  session({
    secret: "your-secret-key", // Replace with a strong, unique secret key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Example: session lasts for 1 minute
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");

  next();
});

Database.connectDatabase();
routeAddmin(app);
routeClient(app);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

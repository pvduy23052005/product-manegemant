const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/category.controller.js");

router.get("/:slug", controller.index);

module.exports = router;

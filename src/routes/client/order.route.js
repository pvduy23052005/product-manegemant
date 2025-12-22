const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/order.controller.js");

router.get("/", controller.index);


module.exports = router;

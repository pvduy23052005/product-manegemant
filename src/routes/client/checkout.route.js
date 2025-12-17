const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/checkout.controller.js");

router.get("/", controller.index);

router.post("/order", controller.checkoutPost);

module.exports = router;

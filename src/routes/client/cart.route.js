const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller.js");

router.post("/add/:id", controller.addPost);

module.exports = router;

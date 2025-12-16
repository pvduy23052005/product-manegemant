const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/cart.controller.js");

router.post("/add/:id", controller.addPost);

router.get("/", controller.index);

router.get("/delete/:id", controller.deleteProduct);

router.get("/update/:id/:quanity", controller.updateQuanity);

module.exports = router;

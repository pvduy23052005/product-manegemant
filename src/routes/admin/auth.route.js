const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller");

router.get("/login", controller.index);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

module.exports = router;

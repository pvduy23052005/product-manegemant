const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller");

router.get("/", controller.index);

module.exports = router;

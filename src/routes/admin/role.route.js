const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/role.controller");

router.get("/", controller.index);

router.patch("/permission", controller.permission);

module.exports = router;

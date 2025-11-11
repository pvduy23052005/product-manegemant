const express = require("express");
const route = express.Router();
const controller = require("../../controllers/admin/role.controller");

route.get("/", controller.index);

module.exports = route;

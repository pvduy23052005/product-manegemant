const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/account.controller");
const upload = require("../../middlewares/admin/uploadCloud");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", upload.uploadSingle("avatar"), controller.createPost);

module.exports = router;

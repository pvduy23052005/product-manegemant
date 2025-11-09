const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/category.controller");
const upload = require("../../middlewares/admin/uploadCloud");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.get("/create", controller.create);

router.post("/create", upload.uploadSingle("thumbnail"), controller.createPost);

module.exports = router;

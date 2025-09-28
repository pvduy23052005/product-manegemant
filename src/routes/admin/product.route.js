const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const upload = require("../../middlewares/admin/uploadCloud");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.get("/create", controller.create);

router.post("/create", upload.uploadSingle("thumbnail"), controller.createPost);

module.exports = router;

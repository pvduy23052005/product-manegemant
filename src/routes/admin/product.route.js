const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
const upload = require("../../middlewares/admin/uploadCloud");
const productValidate = require("../../validate/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.get("/create", controller.create);

router.post(
  "/create",
  upload.uploadSingle("thumbnail"),
  productValidate,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.uploadSingle("thumbnail"),
  productValidate,
  controller.editPatch
);

module.exports = router;

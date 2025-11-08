const { model } = require("mongoose");
const Category = require("../../models/category.model");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const categories = await Category.find(find);

  res.render("admin/pages/category/index", {
    title: "Category",
    categories: categories,
  });
};

//[patch] /admin/category/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    await Category.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );
    req.flash("success", "Thay đổi trạng thái thành công");
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/category");
};

const Category = require("../../models/category.model");

//[get] /admin/categor
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

//[patch] /admin/category
module.exports.changeMulti = async (req, res) => {
  const listIdItem = JSON.parse(req.body.listIdItem);

  console.log(listIdItem);
  try {
    switch (listIdItem.statusChange) {
      case "active":
        await Category.updateMany(
          {
            _id: { $in: listIdItem.listId },
          },
          {
            status: "active",
          }
        );
        req.flash("success", "Cập nhật nhiều bản ghi thành công");
        break;
      case "inactive":
        await Category.updateMany(
          {
            _id: { $in: listIdItem.listId },
          },
          {
            status: "inactive",
          }
        );
        req.flash("success", "Cập nhật thành công");
        break;
      case "delete":
        await Category.updateMany(
          {
            _id: { $in: listIdItem.listId },
          },
          {
            deleted: true,
          }
        );
        req.flash("success", "Xóa nhiều thành công");
        break;
      default:
        req.flash("error", "Vui lòng chọn hành động");
        break;
    }
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/category");
};

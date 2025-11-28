const Category = require("../../models/category.model");
const helperSearch = require("../../helpers/helperSerach");

//[get] /admin/categor
module.exports.index = async (req, res) => {
  const status = req.query.status;

  let find = {
    deleted: false,
  };
  if (status) {
    find["status"] = status;
  }
  let objectSearch = helperSearch.helperSearch(req);
  if (!req.query.keySeach) {
    find["title"] = objectSearch.title;
  }

  const categories = await Category.find(find).sort({ createdAt: -1 });

  res.render("admin/pages/category/index", {
    title: "Category",
    categories: categories,
    keySearch: req.query.keySeach || "",
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

//[patch] /admin/category/change-multi
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
        req.flash("success", "Thay đổi trạng thái thành công");
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

//[get] /admin/category/create.
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const categories = await Category.find(find).select("title");

  res.render("admin/pages/category/create", {
    title: "Create Category",
    categories,
  });
};

//[post] /admin/category/create.
module.exports.createPost = async (req, res) => {
  try {
    const newCategory = new Category(req.body);

    const countCategory = await Category.countDocuments();
    if (newCategory.position) {
      newCategory.position = parseInt(newCategory.position);
    } else {
      newCategory.position = countCategory + 1;
    }

    await newCategory.save();
    req.flash("success", "Tạo mới thành công");
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/category");
};

//[delete] /admin/category/delete.
module.exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    await Category.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
      }
    );
    req.flash("success", "Xóa thành công");
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/category");
};

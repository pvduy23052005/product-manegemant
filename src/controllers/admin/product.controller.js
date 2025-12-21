const Product = require("../../models/product.model");
const helperSearch = require("../../helpers/helperSerach");
const Category = require("../../models/category.model");
const Account = require("../../models/account.model");

//[get] /admin/product
module.exports.index = async (req, res) => {
  const status = req.query.status;
  let find = {
    deleted: false,
  };

  if (status) {
    find["status"] = status;
  }

  let objectSearch = helperSearch.helperSearch(req);

  if (req.query.keySearch != "") {
    find["title"] = objectSearch.title;
  }

  const listProduct = await Product.find(find).sort({ createdAt: -1 });

  for (const product of listProduct) {
    const user = await Account.findOne({
      _id: product.createBy.account_id,
    }).select("fullName");
    if (user) {
      product.userCreate = user.fullName;
    } else {
      product.userCreate = "";
    }
  }

  res.render("admin/pages/product/index", {
    title: "Sản phẩm",
    listProduct: listProduct,
    keySearch: req.query.keySearch || "",
  });
};

//[get] /admin/product/change-status/:status/:id ;
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  try {
    await Product.updateOne(
      {
        _id: id,
      },
      {
        status: status,
        $push: {
          updatedBy: {
            account_id: res.locals.user.id,
            updatedTime: new Date(),
          },
        },
      }
    );
    req.flash("success", "Thanh đổi thành công");
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
  } catch (error) {
    req.flash("erorr", "Vui lòng thử lại");
    console.log(error);
  }
};

// [get] /admin/product/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };
  const categories = await Category.find(find).sort({ createdAt: -1 });
  res.render("admin/pages/product/create", {
    title: "Tạo mới sản phẩm",
    categories: categories,
  });
};

// [post] /admin/product/create
module.exports.createPost = async (req, res) => {
  try {
    if (req.body.position == "") {
      let find = {
        deleted: false,
        status: "active",
      };
      req.body.position = await Product.countDocuments(find);
    } else {
      req.body.position = parseInt(req.body.position);
    }

    req.body.createBy = {
      account_id: res.locals.user.id,
    };

    const newProduct = new Product(req.body);

    await newProduct.save();

    req.flash("success", "Thêm mới thành công");
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/product");
};

// [get] /admin/product/edit/:id ;
module.exports.edit = async (req, res) => {
  const idProduct = req.params.id;

  let find = {
    _id: idProduct,
    deleted: false,
  };

  const product = await Product.findOne(find);
  const categories = await Category.find({
    deleted: false,
    status: "active",
  }).sort({ createdAt: -1 }).select("title");

  res.render("admin/pages/product/edit", {
    title: "edit product",
    product: product,
    categories : categories
  });
};

// [patch] /admin/product/edit/:id ;
module.exports.editPatch = async (req, res) => {
  const idProduct = req.params.id;

  try {
    req.body.price = parseInt(req.body.price);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
      let find = {
        deleted: false,
        status: "active",
      };
      req.body.position = await Product.countDocuments(find);
    } else {
      req.body.position = parseInt(req.body.position);
    }

    await Product.updateOne(
      {
        _id: idProduct,
      },
      {
        ...req.body,
        $push: {
          updatedBy: {
            account_id: res.locals.user.id,
            updatedTime: new Date(),
          },
        },
      }
    );
    req.flash("success", "Cập nhật thành công!");
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/product/edit/" + idProduct);
};

// [delete] /admin/product/delete/:id
module.exports.delete = async (req, res) => {
  const idProduct = req.params.id;
  const product = await Product.findOne({ _id: idProduct }).select("title");

  try {
    await Product.updateOne(
      {
        _id: idProduct,
      },
      {
        deleted: true,
        deletedBy: {
          account_id: res.locals.user.id,
          deletedTime: new Date(),
        },
      }
    );
    req.flash("success", `Xóa thành công ${product.title} !`);
  } catch (error) {
    console.log(error);
    req.flash(`error", "Vui lòng thử lai`);
  }

  res.redirect("/admin/product");
};

// [patch] /admin/product/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    // conver json to object.
    const listIdItem = JSON.parse(req.body.listIdItem);
    const { listId, statusChange } = listIdItem;

    switch (statusChange) {
      case "active":
        await Product.updateMany(
          { _id: { $in: listId } },
          {
            status: statusChange,
            $push: {
              updatedBy: {
                account_id: res.locals.user.id,
                updateTime: new Date(),
              },
            },
          }
        );
        req.flash("success", `Thay đổi trạng thái thành công! `);
        break;
      case "delete":
        await Product.updateMany(
          { _id: { $in: listId } },
          {
            deleted: true,
            deletedBy: {
              account_id: locals.user.id,
            },
          }
        );
        req.flash("success", `Thay đổi trạng phẩm thành công! `);
        break;
      case "inactive":
        await Product.updateMany(
          { _id: { $in: listId } },
          { status: statusChange }
        );
        req.flash("success", `Thay đổi trạng thái thành công`);
        break;
      default:
        break;
    }
  } catch (error) {
    req.flash("error", "Vui lòng thử lại");
  }
  res.redirect("/admin/product");
};

// [get] /admin/product/detail/:id
module.exports.detail = async (req, res) => {
  const id = req.params.id;

  const product = await Product.findOne({
    _id: id,
    deleted: false,
  });
  res.render("admin/pages/product/detail", {
    title: `Chi tiết sản phẩm ${product.title}`,
    product: product,
  });
};

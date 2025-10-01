const Product = require("../../models/product.model");
const helperSearch = require("../../helpers/helperSerach");

//[get] /admin/product
module.exports.index = async (req, res) => {
  const status = req.query.status;
  let find = {
    deleted: false,
  };

  if(status){
    find["status"] = status ; 
  }

  let objectSearch = helperSearch.helperSearch(req);

  if (req.query.keySearch != "") {
    find["title"] = objectSearch.title;
  }

  const listProduct = await Product.find(find).sort({ createdAt: -1 });

  res.render("admin/pages/product/index", {
    title: "Products",
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
      }
    );
    req.flash("success", "Thanh đổi thành công!");
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
  } catch (error) {
    req.flash("erorr", "Thanh đổi thất bại vui lòng thư lại!");
    consle.log(error);
  }
};

// [get] /admin/product/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product/create", {
    title: "Create Product",
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

    const newProduct = new Product(req.body);

    await newProduct.save();

    req.flash("success", "Thêm mới thành công!");
  } catch (error) {
    req.flash("error", "Lỗi mạng!");
  }
  res.redirect("/admin/product");
};

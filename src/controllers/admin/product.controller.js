const Product = require("../../models/product.model");
const helperSearch = require("../../helpers/helperSerach");

//[get] /admin/product
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

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
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
  } catch (error) {}
};

// [get] /admin/product/create
module.exports.create = (req, res) => {
  res.render("admin/pages/product/create", {
    title: "Create Product",
  });
};

// [post] /admin/product/create
module.exports.createPost = (req, res) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.save();
    res.redirect("/admin/product");
  } catch (err) {
    console.log(err);
  }
};
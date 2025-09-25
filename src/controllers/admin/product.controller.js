const Product = require("../../models/product.model");

//[get] /admin/product
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
    status: "active",
  };

  const listProduct = await Product.find(find);

  // console.log(listProduct);

  res.render("admin/pages/product/index", {
    title: "Products",
  });
};

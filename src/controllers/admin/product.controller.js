const Product = require("../../models/product.model");

//[get] /admin/product
module.exports.index = async (req, res) => {
  
  let find = {
    deleted: false,
  };

  const listProduct = await Product.find(find);


  res.render("admin/pages/product/index", {
    title: "Products",
    listProduct : listProduct
  });
};

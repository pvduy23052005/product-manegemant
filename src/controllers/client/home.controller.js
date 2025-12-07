const Product = require("../../models/product.model");
const Category = require("../../models/category.model");

// [get] /
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
    status: "active",
  };

  const products = await Product.find(find).select(
    "-createBy  -updatedBy  -deletedBy"
  );
  const categories = await Category.find(find);
  
  res.render("client/pages/home/index", {
    title: "Home",
    products: products,
    categories : categories
  });
};

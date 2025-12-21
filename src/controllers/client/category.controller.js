const Category = require("../../models/category.model");
const Product = require("../../models/product.model");

// /category/slug
module.exports.index = async (req, res) => {
  const slug = req.params.slug;

  const category = await Category.findOne({
    slug: slug,
    deleted: false,
    status: "active",
  }).select("title");

  const products = await Product.find({
    category: category.id,
    deleted: false,
    status: "active",
  });


  res.render("client/pages/category/index", {
    title: slug,
    slug: category.title,
    products : products
  });
};

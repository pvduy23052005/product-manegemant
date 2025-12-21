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
    categories: categories,
  });
};

// [get] /product/detail/:slug.
module.exports.detail = async (req, res) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({
      slug: slug,
    });

    res.render("client/pages/product/detail.pug", {
      title: product.slug,
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

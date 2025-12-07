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

// [get] /product/detial/:slug.
module.exports.detial = async (req, res) => {
  try {
    const slug = req.params.slug;

    const product = await Product.findOne({
      slug: slug,
    });

    console.log(product);
    res.render("client/pages/product/detial.pug", {
      title: product.slug,
      product: product,
    });
  } catch (error) {
    console.log(error);
  }
};

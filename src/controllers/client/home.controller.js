const Product = require("../../models/product.model");

// [get] /
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
    status: "active",
  };

  const products = await Product.find(find).select(
    "-createBy  -updatedBy  -deletedBy"
  );

  console.log(products);

  res.render("client/pages/home/index", {
    title: "Home",
  });
};

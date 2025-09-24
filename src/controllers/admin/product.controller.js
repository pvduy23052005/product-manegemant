//[get] /admin/product
module.exports.index = (req, res) => {
  res.render("admin/pages/product/index", {
    title: "Products",
  });
};

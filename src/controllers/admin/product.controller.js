const Product = require("../../models/product.model");

//[get] /admin/product
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const listProduct = await Product.find(find);

  res.render("admin/pages/product/index", {
    title: "Products",
    listProduct: listProduct,
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

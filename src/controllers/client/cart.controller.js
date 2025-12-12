const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

module.exports.addPost = async (req, res) => {
  const productId = req.params.id;
  const quantity = parseInt(req.body.quantity);

  const product = {
    product_id: productId,
    quantity: quantity,
  };
  let cart = await Cart.findOne({
    _id: req.cookies.cartId,
  });

  const exitProduct = cart.products.find(
    (item) => item.product_id.toString() === productId
  );
  if (exitProduct) {
    exitProduct.quantity += quantity;

    await Cart.updateOne(
      {
        _id: cart._id,
        "products.product_id": productId,
      },
      {
        $set: {
          "products.$.quantity": exitProduct.quantity,
        },
      }
    );
  } else {
    await Cart.updateOne(
      { _id: cart._id },
      {
        $push: {
          products: product,
        },
      }
    );
  }
  const data = await Product.findOne({
    _id: productId,
  }).select("slug");

  req.flash("success", "Thêm sản phẩm vào giỏ hàng thành công!");
  res.redirect(`/product/detial/${data.slug}`);
};

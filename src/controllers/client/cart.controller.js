const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [post] /cart/post.
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

// [get] /cart .
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const cart = await Cart.findOne({
    _id: cartId,
  });

  let products = [];
  let totalPrice = 0;
  for (item of cart.products) {
    const product = await Product.findOne({
      _id: item.product_id,
    }).select("-description -createBy -deletedBy -updatedBy");
    let newPrice =
      product.price - (product.price * product.discountPercentage) / 100;
    product["newPrice"] = newPrice.toFixed(0);
    product["quantity"] = item.quantity;
    totalPrice += parseInt(newPrice * item.quantity);
    products.push(product);
  }

  res.render("client/pages/cart/index", {
    titl: "Cart",
    products: products,
    totalPrice: totalPrice,
  });
};

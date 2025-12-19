const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const Order = require("../../models/order.model");
const { redirect } = require("react-router-dom");

// [get] /checkout
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

  res.render("client/pages/checkout/index", {
    title: "Checkout",
    products: products,
    totalPrice: totalPrice,
  });
};

// [post] /checkout/order .
module.exports.checkoutPost = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  let products = [];

  if (!req.body.email) {
    req.flash("error", "Vui lòng nhập đầy đủ thông tin");
    redirect("/checkout");
    return;
  }
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng nhập đầy đủ thông tin");
    redirect("/checkout");
    return;
  }
  if (!req.body.address) {
    req.flash("error", "Vui lòng nhập đầy đủ thông tin");
    redirect("/checkout");
    return;
  }
  if (!req.body.phone) {
    req.flash("error", "Vui lòng nhập đầy đủ thông tin");
    redirect("/checkout");
    return;
  }
  try {
    const cart = await Cart.findOne({
      _id: cartId,
    });

    if (!cart || cart.products.length === 0) return redirect("/");

    for (const item of cart.products) {
      let product = await Product.findOne({
        _id: item.product_id,
      })
        .select("price discountPercentage")
        .lean();

      product.quantity = item.quantity;
      product.product_id = item.product_id;

    }

    const order = {
      user_id: "",
      cart_id: cartId,
      userInfo: userInfo,
      products: products,
    };

    const newOrder = new Order(order);
    newOrder.save();

    await Cart.updateOne(
      {
        _id: cartId,
      },
      {
        products: [],
      }
    );
    req.flash("success", "Đặt hàng thành công");
  } catch (error) {
    console.log(error);
    req.flash("success", "Vui lòng thử lại");
  }
  res.redirect("/cart");
};

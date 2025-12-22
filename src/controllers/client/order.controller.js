const Order = require("../../models/order.model");

// [get] /order /
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;

  const orders = await Order.find({
    cart_id: cartId,
  });

  res.render("client/pages/order/index", {
    title: "Đơn hàng",
    orders: orders,
  });
};

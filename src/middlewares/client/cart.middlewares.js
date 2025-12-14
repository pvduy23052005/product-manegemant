const Cart = require("../../models/cart.model");

module.exports.cartMiddlewares = async (req, res, next) => {
  const cartId = req.cookies.cartId;

  if (!cartId) {
    const cart = new Cart();
    await cart.save();
    const expiresTime = 10 * 24 * 60 * 60 * 1000;
    const expiresDate = new Date(Date.now() + expiresTime);
    res.cookie("cartId", cart.id, {
      expires: expiresDate,
    });
  }

  let count = 0;
  const cart = await Cart.findOne({
    _id: cartId,
  });
  for (product of cart.products) {
    count += parseInt(product.quantity);
  }

  res.locals.quantityProduct = count;

  next();
};

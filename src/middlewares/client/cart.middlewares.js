const Cart = require("../../models/cart.model");

module.exports.cartMiddlewares = async (req, res, next) => {
  try {
    let cart;
    const cartId = req.cookies.cartId;

    if (cartId) {
      cart = await Cart.findById(cartId);
    }

    if (!cart) {
      cart = new Cart({ products: [] });
      await cart.save();

      const expiresTime = 10 * 24 * 60 * 60 * 1000;
      res.cookie("cartId", cart._id.toString(), {
        expires: new Date(Date.now() + expiresTime),
        httpOnly: true,
      });
    }

    let count = 0;
    for (const product of cart.products) {
      count += Number(product.quantity) || 0;
    }

    res.locals.quantityProduct = count;
    res.locals.cart = cart;

    next();
  } catch (error) {
    next(error);
  }
};

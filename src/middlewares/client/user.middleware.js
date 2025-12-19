const User = require("../../models/user.model");

module.exports.userMiddleware = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;

  if (tokenUser) {
    const user = await User.findOne({
      tokenUser: tokenUser,
    }).select("-password");

    if (user) {
      res.locals.user = user;
    }
  }

  next();
};

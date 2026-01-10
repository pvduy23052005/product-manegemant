const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.redirect("/admin/auth/login");
      return;
    }

    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Account.findOne({
      _id: data.userId,
      deleted: false,
      status: "active",
    }).select("-password");

    if (!user) {
      res.redirect("/admin/auth/login");
      return;
    }

    const role = await Role.findOne({
      _id: user.role_id,
    });
    res.locals.user = user;
    res.locals.role = role;

    next();
  } catch (error) {
    res.redirect("/admin/auth/login");
    return;
  }
};

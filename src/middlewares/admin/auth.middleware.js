const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin/auth/login");
    return;
  }

  const user = await Account.findOne({
    token: token,
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
};

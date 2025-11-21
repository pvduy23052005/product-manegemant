const Account = require("../../models/account.model");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.redirect("/admin/auth/login");
    return;
  }

  const email = await Account.findOne({
    token: token,
    deleted: false,
    status: "active",
  });

  if (!email) {
    res.redirect("/admin/auth/login");
    return;
  }

  next();
};

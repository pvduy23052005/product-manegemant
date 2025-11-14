const Account = require("../../models/account.model");
const md5 = require("md5");

//[get] /admin/auth
module.exports.index = (req, res) => {
  res.render("admin/pages/auth/index");
};

//[post] /admin/auth/login
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  const checkEmail = await Account.findOne({
    email: email,
    deleted: false,
  });

  if (!checkEmail) {
    req.flash("error", "Email không tồn tại");
    res.redirect("/admin/auth/login");
    return;
  }

  if (checkEmail.password != md5(password)) {
    req.flash("error", "Mật khẩu không đúng");
    res.redirect("/admin/auth/login");
    return;
  }

  if (checkEmail.status == "inactive") {
    req.flash("error", "Tài khoản của bản đã bị khóa!");
    res.redirect("/admin/auth/login");
    return;
  }

  res.redirect("/admin");
};

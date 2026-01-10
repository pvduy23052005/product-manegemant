const Account = require("../../models/account.model");
const md5 = require("md5");
const jwt = require("jsonwebtoken");

//[get] /admin/auth/login
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

  const payload = {
    userId: checkEmail.id,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    path: "/",
    sameSite: "lax",
  });

  res.redirect("/admin/dashboard");
};

//[get] /admin/auth/logout
module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect("/admin/auth/login");
};

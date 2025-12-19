const User = require("../../models/user.model");
const md5 = require("md5");

// [get] /user/login
module.exports.index = (req, res) => {
  res.render("client/pages/user/login");
};

// [post] /user/login
module.exports.loginPost = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
      email: email,
    });

    if (!email || !password) {
      req.flash("error", "Vui lòng điền đầy đủ thông tin");
      return res.redirect("/user/login");
    }

    if (!user) {
      req.flash("error", "Email không chính xác");
      return res.redirect("/user/login");
    }

    if (user.password != md5(password)) {
      req.flash("error", "Password không chính xác");
      return res.redirect("/user/login");
    }

    res.cookie("tokenUser", user.tokenUser);

    res.send("ok");
  } catch (error) {
    console.log(error);
  }
};

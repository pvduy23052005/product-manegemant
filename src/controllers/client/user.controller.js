const User = require("../../models/user.model");
const md5 = require("md5");

// [get] /user/login
module.exports.login = (req, res) => {
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

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// [get] /user/register
module.exports.register = async (req, res) => {
  res.render("client/pages/user/register");
};

// [post] /user/register
module.exports.registerPost = async (req, res) => {
  let { email, password, fullName, passwordConfirm } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });

    if (user) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/user/register");
      return;
    }
    if (password != passwordConfirm) {
      req.flash("error", "Xác nhận password không đúng");
      res.redirect("/user/register");
      return ; 
    }

    password = md5(password);
    const userObject = {
      fullName: fullName,
      email: email,
      password: password,
    };

    const newUser = new User(userObject);
    newUser.save();
    res.cookie("tokenUser", newUser.tokenUser);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const User = require("../../models/user.model");
const md5 = require("md5");
const random = require("../../helpers/random");
const ForgotPassword = require("../../models/forgot-password");

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
      return;
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

// [get] /user/logout
module.exports.logout = async (req, res) => {
  try {
    res.clearCookie("tokenUser");
    res.redirect("/");
  } catch (error) {}
};

// [get] /user/password/forgot.
module.exports.forgotPassword = async (req, res) => {
  res.render("client/pages/user/forgot-password");
};

// [post] /user/password/forgot.
module.exports.forgotPasswordPost = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({
      email: email.toString(),
    }).select("-password");

    if (!user) {
      req.flash("error", "Email không tồn tại");
      return res.redirect("/user/password/forgot");
    }

    const objectOtp = {
      email: email,
      otp: random.randomNumber(6),
    };

    const newOtp = ForgotPassword(objectOtp);
    await newOtp.save();

    res.redirect(`/user/password/otp?email=${email}`);
  } catch (error) {
    console.log(error);
  }
};

// [get] /user/password/otp .
module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;

  res.render("client/pages/user/otp-password", {
    email: email,
  });
};

// [post] /user/password/otp .
module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otpEnter = req.body.otp;

  try {
    const otp = await ForgotPassword.findOne({
      email: email,
      otp: otpEnter,
    }).sort({
      createdAt: -1,
    });

    if (!otp) {
      req.flash("error", "Otp không chính xác");
      return res.redirect(`/user/password/otp?email=${email}`);
    }

    const user = await User.findOne({
      email: email,
    });

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
  } catch (error) {}
};

// [get] /user/password/reset .
module.exports.resetPassword = (req, res) => {
  res.render("client/pages/user/reset-password");
};

// [post] /user/password/reset .
module.exports.resetPasswordPost = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const tokenUser = req.cookies.tokenUser;

  console.log(password, confirmPassword);
  if (password != confirmPassword) {
    req.flash("error", "Mật khẩu không khớp");
    res.redirect("/user/password/reset");
  }

  try {
    await User.updateOne(
      {
        tokenUser: tokenUser,
      },
      {
        password: md5(password),
      }
    );
    res.redirect("/user/login");
  } catch (error) {}
};

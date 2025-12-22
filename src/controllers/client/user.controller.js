const User = require("../../models/user.model");
const md5 = require("md5");
const random = require("../../helpers/random");
const ForgotPassword = require("../../models/forgot-password");
const sendEmail = require("../../helpers/sendMail");
const Cart = require("../../models/cart.model");

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

    const cart = await Cart.findOne({
      user_id: user.id,
    });

    if (cart) {
      res.cookie("cartId", cart.id);
      await Cart.updateOne(
        {
          _id: cart.id,
        },
        {
          user_id: user.id,
        }
      );
    } else {
      await Cart.updateOne(
        {
          _id: req.cookies.cartId,
        },
        {
          user_id: user.id,
        }
      );
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

    const subject = `[Xác thực] Mã OTP của bạn: ${newOtp.otp}`;

    // Sử dụng template string để thiết kế layout chuyên nghiệp
    let html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #007bff; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Xác Thực Tài Khoản</h1>
          </div>
          <div style="padding: 30px; background-color: #ffffff;">
              <p>Xin chào,</p>
              <p>Bạn đã yêu cầu mã xác thực OTP để hoàn tất đổi mật khẩu. Vui lòng sử dụng mã dưới đây:</p>
              
              <div style="text-align: center; margin: 30px 0;">
                  <span style="display: inline-block; padding: 15px 30px; font-size: 32px; font-weight: bold; color: #007bff; background-color: #f0f7ff; border: 2px dashed #007bff; letter-spacing: 5px; border-radius: 5px;">
                      ${newOtp.otp}
                  </span>
              </div>
              
              <p style="color: #ff0000; font-size: 14px;"><b>Lưu ý:</b> Mã này sẽ hết hạn sau 3 phút. Vui lòng không chia sẻ mã này cho bất kỳ ai để bảo mật tài khoản.</p>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
              <p style="font-size: 12px; color: #888;">Nếu bạn không thực hiện yêu cầu này, vui lòng bỏ qua email này hoặc liên hệ hỗ trợ.</p>
          </div>
      </div>
      `;
    sendEmail.sendEmail(email, subject, html);

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
  const { password, passwordConfirm } = req.body;
  const tokenUser = req.cookies.tokenUser;

  if (password != passwordConfirm) {
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

// [get] /user/profile .
module.exports.profile = async (req, res) => {
  try {
    const user = res.locals.user;

    if (!user) {
      return res.redirect("/user/login");
    }
    const find = {
      deleted: false,
    };

    res.render("client/pages/user/profile", {
      title: "Thông tin cá nhân",
      user: user,
    });
  } catch (error) {}
};

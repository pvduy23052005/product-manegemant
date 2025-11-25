const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const md5 = require("md5");

//[get] /admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const accounts = await Account.find(find).select("-password");

  for (const account of accounts) {
    const role = await Role.findOne({ _id: account.role_id }).select("title");
    account.role = role;
  }

  res.render("admin/pages/account/index", {
    title: "Tài khoản",
    accounts: accounts,
  });
};

//[get] /admin/account/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/account/create.pug", {
    title: "Create account",
    roles: roles,
  });
};

//[post] /admin/account/create
module.exports.createPost = async (req, res) => {
  try {
    const email = await Account.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (email) {
      req.flash("error", "Email đã tồn tại");
      res.redirect("/admin/account/create");
      return;
    }

    req.body.password = md5(req.body.password);

    const newAccount = new Account(req.body);
    await newAccount.save();
    req.flash("success", "Tạo tài khoản thành công");
    res.redirect("/admin/account");
  } catch (error) {
    console.error(error);
    req.flash("error", "Có lỗi xảy ra, vui lòng thử lại");
    res.redirect("/admin/account/create");
  }
};

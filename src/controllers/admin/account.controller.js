const Account = require("../../models/account.model");
const Role = require("../../models/role.model");

//[get] /admin/account
exports.index = async (req, res) => {
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

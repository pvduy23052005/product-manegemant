const Role = require("../../models/role.model");

// [get] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const roles = await Role.find(find);

  res.render("admin/pages/role/index", {
    title: "Phân quyền",
    roles : roles,
  });
};

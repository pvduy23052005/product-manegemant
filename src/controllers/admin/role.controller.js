const Role = require("../../models/role.model");

// [get] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const roles = await Role.find(find);
  res.render("admin/pages/role/index", {
    title: "Phân quyền",
    roles: roles,
  });
};

// [patch] /admin/role/permission
module.exports.permission = async (req, res) => {
  const listPermissions = JSON.parse(req.body.permissions);
  for (const item of listPermissions) {
    const roleId = item.roleId;
    const permissions = item.permissions;
    try {
      await Role.updateOne(
        {
          _id: roleId,
        },
        {
          permissions: permissions,
        }
      );
      req.flash("success", "Cập nhật thành công!");
    } catch (error) {
      console.log(error);
      req.flash("success", "Vui lòng thử lại!");
    }
  }

  res.redirect("/admin/role");
};

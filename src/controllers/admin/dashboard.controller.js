//[get] /admin
module.exports.index = (req, res) => {
  // const backUrl = req.get("Referer");
  // res.redirect(backUrl);
  res.render("admin/pages/dashboard/index", {
    title : "Dashboard",
  });
};

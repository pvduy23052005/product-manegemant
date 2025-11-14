//[get] /admin/auth
module.exports.index = (req, res) => {
  res.render("admin/pages/auth/index");
};

//[get] /admin/auth/login
module.exports.loginPost = (req, res) => {
  // Handle login logic here
  res.send("Login POST request received");
};

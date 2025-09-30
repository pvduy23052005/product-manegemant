module.exports = (req, res, next) => {
  if (!req.body.title) {
    req.flash("warning", "Vui lòng nhập tiêu đề!");
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
    return;
  }

  if (!req.body.price) {
    req.flash("warning", "Vui lòng nhập giá!");
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
    return;
  }

  next();
};

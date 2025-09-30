module.exports = (req, res, next) => {
  if (!req.body.title) {
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
    return;
  }

  if (!req.body.price) {
    const backgUrl = req.get("referer");
    res.redirect(backgUrl);
    return;
  }

  next();
};

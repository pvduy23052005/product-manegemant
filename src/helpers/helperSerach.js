module.exports.helperSearch = (req) => {
  const searchValue = req.query.keySearch;

  let objectSearch = {};

  if (searchValue != "") {
    const regex = new RegExp(searchValue, "i");
    objectSearch["title"] = regex;
  }

  return objectSearch;
};

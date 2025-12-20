module.exports.randomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

module.exports.randomNumber = (length) => {
  const number =
    "0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += number.charAt(Math.floor(Math.random() * number.length));
  }

  return result;
};

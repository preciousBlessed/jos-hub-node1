const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 3 * Number(process.env.JWT_EXPIRATION);

const createToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge, // expires in 3'24' hours OR 3 days. maxage is in seconds
  });
};

module.exports = createToken;

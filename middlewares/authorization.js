const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({  success: false, message: "No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SALT, async (error, user) => {
    if (error) {
      return res.status(403).json({  success: false, message: error.message });
    }
      req.tokenUser = user;
      console.log(user)
    next();
  });
};

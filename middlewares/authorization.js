const jwt = require("jsonwebtoken");
const userModel = require('../models/User');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .json({  success: false, message: "No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SALT, async (error, payload) => {
    if (error) {
      return res.status(403).json({  success: false, message: error.message });
    }
    const user = await userModel.findOne({ _id: payload.userId });
    req.tokenUser = user;
    console.log(user);
    console.log('------------------')
    next();
  });
};

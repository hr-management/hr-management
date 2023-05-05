const validator = require('validator');
const UserModel = require('../models/User');

exports.checkEmail = (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return res.status(401).json({
      statuscode: 401,
      message: 'Please provide email.',
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(401).json({
      statuscode: 401,
      message: 'Please provide valid email.',
    });
  }
  next();
};

exports.checkUniqueEmail = async (req, res, next) => {
  const email = req.body.email;
  const checkUser = await UserModel.findOne({ email });
  if (checkUser) {
    return res.status(401).json({
      statuscode: 401,
      message: `${email} is used. Please provide another email.`,
    });
  }
  next();
};

exports.checkUsername = (req, res, next) => {
  const username = req.body.username;
  if (!username) {
    return res.status(401).json({
      statuscode: 401,
      message: 'Please provide username.',
    });
  }

  if (
    !validator.isAlphanumeric(username) ||
    !validator.isByteLength(username, { min: 5, max: 50 })
  ) {
    return res.status(401).json({
      statuscode: 401,
      message:
        'Please provide valid username, username only contains letters and numbers and less than 50 characters',
    });
  }

  next();
};
exports.checkUniqueUsername = async (req, res, next) => {
  const username = req.body.username;
  const checkUser = await UserModel.findOne({ username });
  if (checkUser) {
    return res.status(401).json({
      statuscode: 401,
      message: `${username} is used. Please provide another username.`,
    });
  }
  next();
};
exports.checkPassword = (req, res, next) => {
  const password = req.body.password;
  if (!password) {
    return res.status(401).json({
      statuscode: 401,
      message: 'Please provide password.',
    });
  }
  if (!validator.isLength(password, { min: 3, max: 30 })) {
    return res.status(400).json({
      success: false,
      message: 'The length of the password is between 3-30 characters',
    });
  }
  next();
};
exports.HROnly = (req, res, next) => {
  const role = req.userToken.role;
  if (!role) {
    return res.status(401).json({
      statuscode: 401,
      message: 'Please provide role.',
    });
  }
  if (role !== 'HR') {
    return res.status(401).json({
      statuscode: 401,
      message: "You don't have permission to access this information.",
    });
  }
  next();
};

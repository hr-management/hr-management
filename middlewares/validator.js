const validator = require("validator");

exports.checkEmail = (req, res, next) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide email.",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide valid email.",
    });
  }
  next();
};

exports.checkUsername = (req, res, next) => {
  const username = req.body.username;
  if (!username) {
    return res.status(400).json({
      success: false,
      message: "Please provide username.",
    });
  }

  if (
    !validator.isAlphanumeric(username) ||
    !validator.isByteLength(username, { min: 3, max: 50 })
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Please provide valid username, username only contains letters and numbers and less than 50 characters",
    });
  }

  next();
};

exports.checkPassword = (req, res, next) => {
  const password = req.body.password;
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide password.",
    });
  }
  if (!validator.isLength(password, { min: 3, max: 30 })) {
    return res.status(400).json({
      success: false,
      message: "The length of the password is between 3-30 characters",
    });
  }
  next();
};
exports.HROnly = (req, res, next) => {
  const role = req.tokenUser.role;

  if (role !== "HR") {
    return res.status(400).json({
      success: false,
      message: "You don't have permission to access this information.",
    });
  }
  next();
};


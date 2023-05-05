const express = require("express");
const Router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middlewares/authorization");
const validator = require("../middlewares/validator");

Router.post(
  "/signup",
  validator.checkUsername,
  validator.checkPassword,
  validator.checkEmail,
  authController.userSignup
);
Router.post(
  "/login",
  validator.checkUsername,
  validator.checkPassword,
  authController.userLogin
);
Router.get("/info", authController.userInfo);

Router.put("/info", authController.updateUserInfo);
module.exports = Router;

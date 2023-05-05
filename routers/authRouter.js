const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authorization');
const validator = require('../middlewares/validator');

Router.post(
    '/user/signup',
    validator.checkUsername,
    validator.checkPassword,
    validator.checkEmail,
    authController.userSignup
);
Router.post(
    '/user/login',
    validator.checkUsername,
    validator.checkPassword,
    authController.userLogin
);
Router.get(
    '/user/info',
    authController.userInfo);

Router.put(
    '/user/info',
    authController.updateUserInfo);
module.exports = Router;

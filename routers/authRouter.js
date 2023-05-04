const express = require('express');
const Router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middlewares/authorization');

Router.post('/user/signup', authController.userSignup);
Router.post('/user/login', authController.userLogin);

module.exports = Router;
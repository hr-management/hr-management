const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

Router.put(
    '/onboarding/status',
    authorization,
    userController.userOnboarding
);

module.exports = Router;
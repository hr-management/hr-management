const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');
const requiredValidator = require('../middlewares/requiredValidator');

Router.put(
  '/onboarding/status',
  authorization,
  requiredValidator('body', [
    'firstName',
    'lastName',
    'currentAddress',
    'cellPhoneNumber',
    'ssn',
    'birthDate',
    // visa | green card missing
    'driverLicense',
    'emergencyContact',
  ]),
  userController.userOnboarding
);

module.exports = Router;
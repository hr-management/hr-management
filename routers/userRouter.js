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
    // green card missing
    'emergencyContact',
  ]),
  userController.userOnboarding
);

Router.put(
  '/visa/upload',
  authorization,
  requiredValidator('body', ['file']),
  userController.userVisaUpload
);

Router.post(
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
    'emergencyContact',
  ]),
  userController.userOnboarding
);

Router.get('/:userId', userController.getUserInfoById);

module.exports = Router;
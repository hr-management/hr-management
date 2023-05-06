// routers/fileUploadRouter.js
const express = require('express');
const router = express.Router();
const fileUploadController = require('../controllers/fileController');
const upload = require('../utils/s3Handler').upload;
const authorization = require('../middlewares/authorization');

router.post('/upload', authorization, upload.single('file'), fileUploadController.uploadFile);

module.exports = router;

  
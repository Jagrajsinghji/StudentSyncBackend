const express = require('express');
const router =express.Router();
const imageUploadController= require('../controllers/imageUploadController.js');

router.post('/upload/profile', imageUploadController.uploadProfile);


module.exports = router;
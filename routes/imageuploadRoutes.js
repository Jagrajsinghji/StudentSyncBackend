const express = require('express');
const router =express.Router();
const imageUploadController= require('../controllers/imageUploadController.js');

router.post('/upload/profile', imageUploadController.uploadProfile);
router.post('/upload/studentid', imageUploadController.uploadStudentid);


module.exports = router;
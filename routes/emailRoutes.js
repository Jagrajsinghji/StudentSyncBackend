const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/email/send/:id', emailController.sendEmail);
router.post('/email/send/grid', emailController.sendEmailGrid);
router.get('/email/verify/:encryptedEmail', emailController.verifyEmail);

module.exports = router;
const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

router.post('/email/send/:id', emailController.sendEmail);
router.get('/email/verify/:id', emailController.verifyEmail);

module.exports = router;
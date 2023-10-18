const express = require('express');
const router = express.Router();
const institutionController = require('../controllers/institutionController');

router.get('/institutions', institutionController.getAllInstitutions);

module.exports = router;
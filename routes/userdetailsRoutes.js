const express = require('express');
const router = express.Router();
const userdetailsController = require('../controllers/userdetailsController');

router.get('/users', userdetailsController.getAllUsers);
router.get('/users/:id', userdetailsController.getUser);
router.post('/users', userdetailsController.createUser);
router.patch('/users/:id', userdetailsController.updateUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.post('/posts/create', postController.createPost);

module.exports = router;
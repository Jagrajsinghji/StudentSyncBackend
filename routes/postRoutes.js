const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.post('/posts/create', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.post('/posts', postController.getAUserPosts);

module.exports = router;
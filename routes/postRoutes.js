const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');

router.post('/posts/create', postController.createPost);
router.get('/posts', postController.getAllPosts);
router.get('/postsById', postController.getAllPostByUserId);
router.post('/nearbyPosts', postController.getAllNearbyPosts);

module.exports = router;
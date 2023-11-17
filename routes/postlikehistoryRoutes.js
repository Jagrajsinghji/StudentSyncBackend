const express = require('express');
const router = express.Router();
const postlikehistoryController = require('../controllers/postlikehistoryController.js');

router.post('/posts/like', postlikehistoryController.createPostLike);

module.exports = router;
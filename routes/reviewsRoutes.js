const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/review', reviewController.reviewUser);
router.post('/reviews', reviewController.getAllReviewsByUser);
router.get('/review/:id', reviewController.getAReview);

module.exports = router;
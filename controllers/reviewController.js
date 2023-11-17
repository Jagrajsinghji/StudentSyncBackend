const Review = require('../models/reviews');
const Userdetails = require('../models/userdetails');
const { use } = require('../routes/reviewsRoutes');

// POST /review
exports.reviewUser = async (req, res) => {

    try {

        const { user_id, rating, review_comment, reviewer_user_id } = req.body;

        const user = await Userdetails.findById(user_id);
        const reviewer = await Userdetails.findById(reviewer_user_id);
        if(!user){
            return res.status(404).send('User not found');
        }
        if(!reviewer){
            return res.status(404).send('Reviewer not found');
        }

        const newReview = new Review(req.body);
        await newReview.save();
        res.status(201).send(newReview);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(400).send(error);
    }
}

// POST /reviews
exports.getAllReviewsByUser = async (req, res) => {

    try {
        const {user_id} = req.body;

        //get all data on reviews table by user_id
        const reviews = await Review.find({ user_id });

        // Check if any reviews were found
        if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for the specified user_id." });
        }

        res.status(200).json(reviews);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(500).send(error);
    }
}

// GET /review/:id
exports.getAReview = async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).send('Review not found');
      }
      res.send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  };
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdetails', required: true },
    rating: { type: Number, required: true, enum: [0, 1, 2, 3, 4, 5] },
    review_comment: { type: String, required: true },
    reviewer_user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Userdetails', required: true },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'Userdetails', required: true },
  caption: { type: String, required: true },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  locationName: { type: String, required: true },
  postImg: { type: String },
  numOfLike: { type: Number }
}, { timestamps: true });

postSchema.index({ location: "2dsphere" });
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
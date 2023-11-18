const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref:'Userdetails',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref:'Post',
    default: null,
  },
  reviewId: {
    type: Schema.Types.ObjectId,
    ref:'Review',
    default: null,
  },
  notiType: {
    type: Number,
    required: true,
  },
  notiDescription: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean, // 0 for read, 1 for unread
    required: true,
  },
  actionByUserid: {
    type: String,
    required: true,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postlikehistorySchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:'Userdetails', required: true},
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, { timestamps: true });

const Userdetails = mongoose.model('Postlikehistory', postlikehistorySchema);

module.exports = Userdetails;
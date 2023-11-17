const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:'Userdetails', required: true},
    caption: {type:String, required: true},
    coordinate: {type:[Number]},
    postImg: {type:String},
    numOfLike: {type: Number}
},{ timestamps: true });

const Post =  mongoose.model('Post', postSchema);

module.exports = Post;
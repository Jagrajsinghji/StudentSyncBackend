const postlikehistory = require('../models/postlikehistory');
const post = require('../models/posts');
const Userdetails = require('../models/userdetails');

exports.createPostLike = async(req, res) => {
    try{

        const { userId, postId } = req.body;

        //make sure postId is correct
        const existigpost = await post.findById(postId);
        if(!existigpost){
            return res.status(404).send('No post with this postId');
        }

        //make sure userId is correct
        const existigUser= await Userdetails.findById(userId);
        if(!existigUser){
            return res.status(404).send('No user with this userId');
        }
        
        //check user already like this post
        const existigPostlikehistory = await postlikehistory.findOne({ $or: [{ userId, postId }] });
        if(existigPostlikehistory){
            return res.status(409).send('This user already like the post!');
        }

        const postlike = new postlikehistory({
          userId,
          postId
        });

        //save post in db
        await postlike.save();

        //Add +1 in numOfLike in post collection
        existigpost.numOfLike += 1;
        await existigpost.save();

        res.sendStatus(201);

    }catch(error){
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request value.');
          }
        res.status(500).send(error);
    }
}
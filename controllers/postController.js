const Post = require('../models/posts');
const Userdetails = require('../models/userdetails');

exports.createPost = async(req, res) => {
    try{

        const { userId, caption, coordinate, postImg, numOfLike } = req.body;

        //make sure userId is correct
        const existigUser= await Userdetails.findById(userId);
        if(!existigUser){
            return res.status(404).send('No user with this userId');
        }

        const newpost = new Post({
          userId,
          caption,
          coordinate,
          postImg,
          numOfLike
        });

        //save post in db
        await newpost.save();

        //prepare response data
        const postedUser  = await Userdetails.findById(userId);

        const reponseData = {
            userId: userId,
            name: postedUser.name,
            profile_img_name: postedUser.profile_img_name,
            newpost: newpost
        }



        res.status(201).send(reponseData);


    }catch(error){
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(500).send(error);
    }
}

// GET /posts
exports.getAllPosts = async (req, res) => {
    try {
        const { lat, long, radius } = req.query;

        const posts = await Post.find();
        if(posts.length==0){
            return res.status(200).send("There is no posts.");
        }

        return res.status(200).send(posts);
    } catch (error) {
        return res.status(500).send(error);
    }
  };

  // POST /posts/:id
exports.getAUserPosts = async (req, res) => {
    try {
        const {userId} = req.body;
      
        //get all data on posts table by userId
        const posts = await Post.find({ userId });

        // Check if any reviews were found
        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        return res.status(200).json(posts);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        return res.status(500).send(error);
    }
  };
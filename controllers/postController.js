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
        res.status(500).send(error);
    }
}
const Post = require('../models/posts');
const Userdetails = require('../models/userdetails');

exports.createPost = async (req, res) => {
    try {

        const { userId, caption, coordinate, postImg } = req.body;

        //make sure userId is correct
        const existigUser = await Userdetails.findById(userId);
        if (!existigUser) {
            return res.status(404).send('No user with this userId');
        }

        const newpost = new Post({
            userId,
            caption,
            location: {
                type: "Point",
                coordinates: coordinate
            },
            postImg,
            numOfLike: 0
        });

        //save post in db
        await newpost.save();

        //prepare response data
        const postedUser = await Userdetails.findById(userId);

        const reponseData = {
            userId: userId,
            name: postedUser.name,
            profile_img_name: postedUser.profile_img_name,
            newpost: newpost
        }

        res.status(201).send(reponseData);


    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        res.status(500).send(error);
    }
}

// GET /posts
// GET /posts
exports.getAllPosts = async (req, res) => {
    try {

        // Use populate to include user details in the posts
        const posts = await Post.find().populate({
            path: 'userId',
            model: 'Userdetails',
            select: 'name profile_img_name',
        });

        if (posts.length == 0) {
            return res.status(200).send("There is no posts.");
        }

        // Modify the response to include user's name and profile image
        const modifiedPosts = posts.map(post => ({
            _id: post._id,
            userId: post.userId._id,
            name: post.userId.name,
            profile_img_name: post.userId.profile_img_name,
            caption: post.caption,
            coordinate: post.location.coordinates,
            locationName: post.locationName,
            postImg: post.postImg,
            numOfLike: post.numOfLike,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));

        return res.status(200).send(modifiedPosts);
    } catch (error) {
        return res.status(500).send(error);
    }
};

// exports.getAllPosts = async (req, res) => {
//     try {
//         const { lat, long, radius } = req.query;

//         const posts = await Post.find();
//         if(posts.length==0){
//             return res.status(200).send("There is no posts.");
//         }

//         return res.status(200).send(posts);
//     } catch (error) {
//         return res.status(500).send(error);
//     }
//   };

// GET /postsById/?id
exports.getAllPostByUserId = async (req, res) => {
    try {
        const userId = req.query.userId;
        //get all data on posts table by userId
        const posts = await Post.find({ userId }).populate({
            path: 'userId',
            model: 'Userdetails',
            select: 'name profile_img_name',
        });

        // Check if any posts were found
        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found for this user." });
        }

        // Modify the response to include user's name and profile image
        const modifiedPosts = posts.map(post => ({
            _id: post._id,
            userId: post.userId._id,
            name: post.userId.name,
            profile_img_name: post.userId.profile_img_name,
            caption: post.caption,
            coordinate: post.location.coordinates,
            locationName: post.locationName,
            postImg: post.postImg,
            numOfLike: post.numOfLike,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));

        return res.status(200).json(modifiedPosts);

    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).send('Invalid format. Check your request Id value. ');
        }
        return res.status(500).send(error);
    }
};

// POST /nearbyPosts
exports.getAllNearbyPosts = async (req, res) => {
    try {
        const { lat, long, radiusInMeters } = req.body;

        // Use populate to include user details in the posts
        const posts = await Post.find({
            'location': {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [long,lat]
                    },
                    $maxDistance: radiusInMeters
                }
            }
        }).populate({
            path: 'userId',
            model: 'Userdetails',
            select: 'name profile_img_name',
        });

        if (posts.length == 0) {
            return res.status(200).send({ message: "There are no posts." });
        }

        // Modify the response to include user's name and profile image
        const modifiedPosts = posts.map(post => ({
            _id: post._id,
            userId: post.userId._id,
            name: post.userId.name,
            profile_img_name: post.userId.profile_img_name,
            caption: post.caption,
            coordinate: post.location.coordinates,
            locationName: post.locationName,
            postImg: post.postImg,
            numOfLike: post.numOfLike,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));

        return res.status(200).send(modifiedPosts);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};
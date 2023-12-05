const Userdetails = require('../models/userdetails');
const bcrypt = require('bcrypt');
const Userwantskills = require('../models/userwantskills');
const Userownskills = require('../models/userownskills');
const Review = require('../models/reviews');
const Skills = require('../models/skills');

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const userdetails = await Userdetails.find();
    res.status(200).send(userdetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET /users/:id
exports.getUser = async (req, res) => {
  try {
    const userdetails = await Userdetails.findById(req.params.id);
    if (!userdetails) {
      return res.status(404).send('Username not found');
    }

    const otherInfo = await getAllInfoForUser(req.params.id);
    const result = {
      "details": userdetails,
      ...otherInfo
    }
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};


// GET /users/nearbyBasedOnUserSkills'
exports.getNearbyUsersBasedOnUserSkills = async (req, res) => {
  try {
    const { userId, lat, long, radiusInMeters } = req.body;

    // Find the skills that the user wants to learn
    const userWantskills = await Userwantskills.findOne({ userId }).populate('wantSkills');
    if (userWantskills === null || userWantskills === undefined) throw "Empty want skills for the user";
    const wantedSkills = userWantskills.wantSkills.map(skill => skill._id);

    // Find users who have the wanted skills
    const usersWithSkills = await Userownskills.find({
      'ownSkills': { $in: wantedSkills },
      '_id': { $ne: userId } // Exclude the current user from the results
    }).select('userId');

    if (usersWithSkills.length === 0) {
      throw "No users with given skills";
    }
    const userIds = usersWithSkills.map(user => user.userId.toString());

    const users = await Userdetails.find({
      '_id': { $in: userIds }, 'location': {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long,lat]
          },
          $maxDistance: radiusInMeters
        }
      }
    });

    if (users.length === 0) {
      throw "No users found, try changing the radius";
    }

    const modifiedUsers = await Promise.all(users.map(async (user) => {
      const otherInfo = await getAllInfoForUser(user._id);
      const result = {
        "details": user,
        ...otherInfo
      };
      return result;
    }));
    return res.status(200).json({ users: modifiedUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};


// POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await Userdetails.findOne({ $or: [{ email }, { name }] });

    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    } else {
      const userdetails = new Userdetails(req.body);
      await userdetails.save();
      return res.status(201).send(userdetails);
    }

  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid format. Check your request Id value. ');
    }
    return res.status(400).send(error);
  }
};
// POST /users/pre
exports.createPreUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await Userdetails.findOne({ $or: [{ email }] });

    if (existingUser) {
      return res.status(409).send('Email already exists');
    }

    const userdetails = new Userdetails(req.body);
    userdetails.user_status = "0";
    await userdetails.save();
    return res.status(201).send(userdetails);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).send('Invalid format. Check your request Id value. ');
    }
    return res.status(400).send(error);
  }
};

// PATCH /users/:id
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'user_status', 'institutionId', 'city', 'province', 'country', 'postal_code', 'mobile_number', 'notificationToken', 'student_id_img_name', 'profile_img_name', 'location'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }
  try {
    const userdetails = await Userdetails.findById(req.params.id);
    if (!userdetails) {
      return res.status(404).send('Username not found');
    }
    updates.forEach(update => userdetails[update] = req.body[update]);

    await userdetails.save();
    res.send(userdetails);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};


// GET /users/login
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Userdetails.findOne({ email });

    if (!existingUser) {
      return res.status(404).send('User does not exist!');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }

    return res.status(200).send(existingUser);

  } catch (error) {
    return res.status(400).send(error);
  }
};

getAllInfoForUser = async (userId) => {

  const userownskills = await Userownskills.findOne({ userId })
    .populate({ path: 'ownSkills', model: Skills, select: 'name' })
    .exec();

  const userwantskills = await Userwantskills.findOne({ userId })
    .populate({ path: 'wantSkills', model: Skills, select: 'name' })
    .exec();

  const reviews = await Review.find({ user_id: userId })
    .populate({
      path: 'reviewer_user_id',
      model: 'Userdetails',
      select: 'name profile_img_name',
    });
  const modifiedReviews = reviews?.map(review => ({
    _id: review._id,
    userId: review.user_id._id,
    rating: review.rating,
    review_comment: review.review_comment,
    reviewer_user_id: review.reviewer_user_id._id,
    reviewe_name: review.reviewer_user_id.name,
    reviewe_profile_img_name: review.reviewer_user_id.profile_img_name,
    createdAt: review.createdAt,
    updatedAt: review.updatedAt,
  }))

  return {
    "ownSkills": userownskills?.ownSkills ?? [],
    "wantSkills": userwantskills?.wantSkills ?? [],
    "reviews": modifiedReviews ?? []
  };
}
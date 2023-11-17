const Userdetails = require('../models/userdetails');
const bcrypt = require('bcrypt');
const Userwantskills = require('../models/userwantskills');
const Userownskills = require('../models/userownskills');

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
    res.send(userdetails);
  } catch (error) {
    res.status(500).send(error);
  }
};


// GET /users/byskill/:id'
exports.getAllUsersBySkills = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the skills that the user wants to learn
    const userWantskills = await Userwantskills.findOne({ userId }).populate('wantSkills');
    const wantedSkills = userWantskills.wantSkills.map(skill => skill._id);

    // Find users who have the wanted skills
    const usersWithSkills = await Userownskills.find({
      'ownSkills': { $in: wantedSkills },
      '_id': { $ne: userId } // Exclude the current user from the results
    }).select('userId');

    const userIds = usersWithSkills.map(user => user.userId.toString());

    const users = await Userdetails.find({ '_id': { $in: userIds } });

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};


// POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await Userdetails.findOne({ $or: [{ email }, { name }] });

    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    }

    const userdetails = new Userdetails(req.body);
    await userdetails.save();
    res.status(201).send(userdetails);
  } catch (error) {
    if (error.name === 'CastError') {
        return res.status(400).send('Invalid format. Check your request Id value. ');
    }
    res.status(400).send(error);
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
      userdetails.user_status="0";
      await userdetails.save();
      res.status(201).send(userdetails);
    } catch (error) {
      if (error.name === 'CastError') {
          return res.status(400).send('Invalid format. Check your request Id value. ');
      }
      res.status(400).send(error);
    }
  };

// PATCH /users/:id
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'user_status','institutionId','city','province','country','mobile_number','lat','long','notificationToken'];
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
    updates.forEach(update => console.log(update.name));
    console.log(userdetails);
    await userdetails.save();
    res.send(userdetails);
  } catch (error) {
    res.status(400).send(error);
  }
};


// GET /users/login
exports.loginuser = async (req, res) => {
  try {
      const {email,password} = req.body;
      const existingUser = await Userdetails.findOne({email});

      if(!existingUser){
        return res.status(404).send('User does not exist!')
      }

      const isPasswordValid = await bcrypt.compare(password, existingUser.password);

      if (!isPasswordValid) {
        return res.status(401).send('Invalid password');
      }

      res.status(200).send('Login successful');

  } catch (error) {
    res.status(400).send(error);
  }
};
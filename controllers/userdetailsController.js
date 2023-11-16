const Userdetails = require('../models/userdetails');
const bcrypt = require('bcrypt');

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
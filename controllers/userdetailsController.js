const Userdetails = require('../models/userdetails');

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


// PATCH /users/:id
exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'user_status'];
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
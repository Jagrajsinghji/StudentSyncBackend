const User = require('../models/users');

// GET /users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// GET /users/:id
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send('Username not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// POST /users
exports.createUser = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });

    if (existingUser) {
      return res.status(409).send('Username or email already exists');
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

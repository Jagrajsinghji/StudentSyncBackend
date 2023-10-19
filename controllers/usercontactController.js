const Usercontact = require('../models/usercontacts');

// GET /usercontacts
exports.getAllUsercontacts = async (req, res) => {
    try {
      const usercontacts = await Usercontact.find();
      res.status(200).send(usercontacts);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // POST /usercontacts
exports.createUsercontact = async (req, res) => {
  try {
    const { userId } = req.body;
    const existingUser = await Usercontact.findOne({ $or: [{ userId }] });

    if (existingUser) {
      return res.status(409).send('Usercontact of this user already exists');
    }

    const usercontact = new Usercontact(req.body);
    console.log(usercontact);
    await usercontact.save();
    res.status(201).send(usercontact);
  } catch (error) {
    res.status(400).send(error);
  }
};

// GET /usercontacts/:userId
exports.getAUsercontactByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const usercontact = await Usercontact.findOne({userId:userId});
    if (!usercontact) {
      return res.status(404).send('Usercontact of the user not found');
    }
    res.send(usercontact);
  } catch (error) {
    res.status(500).send(error);
  }
};
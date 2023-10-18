const Skill = require('../models/skills');

// GET /skills
exports.getAllSkills = async (req, res) => {
    try {
      const skills = await Skill.find();
      res.status(200).send(skills);
    } catch (error) {
      res.status(500).send(error);
    }
  };
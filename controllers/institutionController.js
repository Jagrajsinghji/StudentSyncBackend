const Institution = require('../models/institutions');

// GET /instututions
exports.getAllInstitutions= async (req, res) => {
    try {
      const institutions = await Institution.find();
      res.status(200).send(institutions);
    } catch (error) {
      res.status(500).send(error);
    }
  };
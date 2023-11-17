const express = require('express');
const router = express.Router();
const userwantskillsController = require('../controllers/userwantskillsController');

router.get('/userwantskills/:id', userwantskillsController.getAUserWantSkills);
router.post('/userwantskills/add/:id', userwantskillsController.addAUserWantSkills);
//router.delete('/userwantskills/remove/:id', userwantskillsController.deleteAUserWantSkills);

module.exports = router;
const express = require('express');
const router = express.Router();
const userownskillsController = require('../controllers/userownskillsController');

router.get('/userownskills/:id', userownskillsController.getAUserOwnSkills);
router.post('/userownskills/add/:id', userownskillsController.addAUserOwnSkills);
// router.delete('/userownskills/delete/:id', userownskillsController.deleteAUserOwnSkills);

module.exports = router;
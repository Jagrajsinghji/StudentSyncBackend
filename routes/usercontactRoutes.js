const express = require('express');
const router = express.Router();
const usercontactController = require('../controllers/usercontactController');

router.get('/usercontacts', usercontactController.getAllUsercontacts);
router.post('/usercontacts', usercontactController.createUsercontact);
router.get('/usercontacts/:userId', usercontactController.getAUsercontactByUserId);

module.exports = router;
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const { registerUser, loginUser, updateSavedHotels } = require('../controllers/userController');


router.post('/signup', registerUser);
router.post('/login', loginUser);
router.put('/favourites', requireAuth, updateSavedHotels);


module.exports = router;

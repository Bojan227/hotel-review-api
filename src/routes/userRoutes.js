const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const { registerUser, loginUser, getFavourites } = require('../controllers/userController');

router.get('/favourites',requireAuth, getFavourites)
router.post('/signup', registerUser);
router.post('/login', loginUser);


module.exports = router;

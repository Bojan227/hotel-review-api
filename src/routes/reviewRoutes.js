const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const {getReviewsByHotelId, createReview, updateLike, updateDislike} = require('../controllers/reviewController')


router.get('/:hotelId', getReviewsByHotelId);

router.use(requireAuth)
router.post('/', createReview);
router.put('/', updateLike);
router.put('/dislike', updateDislike)

module.exports = router;
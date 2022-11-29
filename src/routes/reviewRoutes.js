const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {
  getReviewsByHotelId,
  createReview,
  updateLike,
  updateDislike,
  getLikeUsers,
  getDislikeUsers,
  getOverallRatingByHotelId,
} = require('../controllers/reviewController');

router.get('/:hotelId', getReviewsByHotelId);
router.get('/rating/:hotelId', getOverallRatingByHotelId);
router.get('/:reviewId/likes', getLikeUsers);
router.get('/:reviewId/dislikes', getDislikeUsers);
router.use(requireAuth);
router.post('/', createReview);
router.put('/', updateLike);
router.put('/dislike', updateDislike);

module.exports = router;
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')

router.get('/', getReviewsByHotelId);
router.use(requireAuth)
router.post('/', createReview);
router.put('/', updateLike);

module.exports = router;
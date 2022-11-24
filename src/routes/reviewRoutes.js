const express = require('express');
const router = express.Router();

router.get('/', getReviewsByHotelId);
router.post('/', createReview);
router.put('/', updateLike);

module.exports = router;
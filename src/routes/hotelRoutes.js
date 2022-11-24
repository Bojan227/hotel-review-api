const express = require('express');
const router = express.Router();

router.get('/', getHotels);
router.get('/:hotelId', getHotelByHotelId);
router.post('/', createHotel);
router.put('/', editHotelDetails);

module.exports = router
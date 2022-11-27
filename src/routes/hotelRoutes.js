const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth')
const {getHotels, getHotelByHotelId, createHotel, editHotelDetails} = require('../controllers/hotelController')


router.get('/', getHotels);
router.get('/:hotelId', getHotelByHotelId);
router.use(requireAuth)
router.post('/', createHotel);
router.put('/', editHotelDetails);

module.exports = router
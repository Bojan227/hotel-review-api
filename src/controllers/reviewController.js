const Review = require('../models/reviewModel');

async function getReviewsByHotelId(request, response) {
    const { hotelId } = request.body;
    try {
      const reviews = await Review.find({ hotelId });
  
      response.status(200).json(reviews);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }

  module.exports = {
    getReviewsByHotelId
  }
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

  async function createReview(request, response) {
    const { text, hotelId, rating } = request.body;
  
    try {
      const review = await Review.create({
        text,
        hotelId,
        likes: [],
        dislikes: [],
        createdBy: request.user[0],
        rating,
      });
  
      response.status(200).json(review);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  module.exports = {
    getReviewsByHotelId,
    createReview
  }
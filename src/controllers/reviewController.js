const Review = require('../models/reviewModel');

async function getReviewsByHotelId(request, response) {
    const { hotelId } = request.params;
    try {
      const reviews = await Review.find({ hotelId }).populate({
        path: 'createdBy',
        select: ['_id', 'email', 'displayName', 'role'],
      });
  
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

  async function updateLike(request, response) {
    const { reviewId } = request.body;
  
    const { likes } = await Review.findOne({
      _id: reviewId,
    });
  
    const update = {
      $set: {
        likes: likes?.find(
          (id) => id.toString() === request.user[0]._id.toString()
        )
          ? likes.filter((id) => id.toString() !== request.user[0]._id.toString())
          : [...likes, request.user[0]._id],
      },
    };
  
    try {
      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId },
        update,
        {
          returnOriginal: false,
        }
      ).populate({
        path: 'createdBy',
        select: ['_id', 'email', 'displayName', 'role'],
      });
      console.log(updatedReview);
      response.status(200).json(updatedReview);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  async function updateDislike(request, response) {
    const { reviewId } = request.body;
  
    const { dislikes } = await Review.findOne({
      _id: reviewId,
    });
  
    const update = {
      $set: {
        dislikes: dislikes?.find(
          (id) => id.toString() === request.user[0]._id.toString()
        )
          ? dislikes.filter(
              (id) => id.toString() !== request.user[0]._id.toString()
            )
          : [...dislikes, request.user[0]._id],
      },
    };
  
    try {
      const updatedReview = await Review.findOneAndUpdate(
        { _id: reviewId },
        update,
        {
          returnOriginal: false,
        }
      ).populate({
        path: 'createdBy',
        select: ['_id', 'email', 'displayName', 'role'],
      });
  
      response.status(200).json(updatedReview);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }


  async function getLikeUsers(request, response) {
    const { reviewId } = request.params;
  
  
    try {
      const {likes} = await Review.findOne(
        { _id: reviewId },
      ).populate({
        path: 'likes',
        select: ['_id', 'email', 'displayName', 'role'],
      });
  
      console.log(likes)
      response.status(200).json({users: likes});
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  async function getDislikeUsers(request, response) {
    const { reviewId } = request.params;
  
  
    try {
      const {dislikes} = await Review.findOne(
        { _id: reviewId },
      ).populate({
        path: 'likes',
        select: ['_id', 'email', 'displayName', 'role'],
      });
  
      response.status(200).json({users: dislikes});
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }



  module.exports = {
    getReviewsByHotelId,
    createReview,
    updateLike,
    updateDislike,
    getLikeUsers,
    getDislikeUsers
  }
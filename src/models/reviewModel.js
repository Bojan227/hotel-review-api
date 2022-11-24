const mongoose = require('mongoose');
const User = require('./userModel');
const HotelDB = require('./hotelModel');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, ref: User },
  hotelId: { type: Schema.Types.ObjectId, ref: HotelDB },
  text: { type: String, required: true },
  likes: [{ type: Schema.Types.ObjectId, ref: User }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: User }],
  rating: { type: Number, min: 1, max: 5, required: true },
});

const myDB = mongoose.connection.useDb('hotel-api');

const Review = myDB.model('Review', ReviewSchema);
module.exports = Review;
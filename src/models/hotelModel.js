const mongoose = require('mongoose');
const User = require('./userModel');
const { Schema } = mongoose;

const HotelSchema = new Schema({
  hotelName: { type: String, required: true },
  address: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imageId: { type: String, required: true },
  text: { type: String, required: true },
  rating: Number,
});

const myDB = mongoose.connection.useDb('hotel-api');

const HotelDB = myDB.model('Hotel', HotelSchema);
module.exports = HotelDB;
const mongoose = require('mongoose');
const HotelDB = require('./hotelModel')
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  role: { type: String, required: true },
  favourites: [{ type: Schema.Types.ObjectId, ref: HotelDB }]
});

const myDB = mongoose.connection.useDb('hotel-api');

const User = myDB.model('User', UserSchema);
module.exports = User;

const User = require('../models/userModel');
const HotelDB = require('../models/hotelModel')
const jwt = require('jsonwebtoken');
const signup = require('../utils/signup');
const login = require('../utils/login');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const updateSavedHotels = async (request, response) => {
  const { hotelId } = request.body;

  const { favourites } = await User.findOne({ _id: request.user[0] });
  const hotel = await HotelDB.findOne({ _id: hotelId });

  const update = {
    $set: {
      favourites: favourites.find(({ _id }) => _id.toString() === hotelId)
        ? favourites.filter(({ _id }) => _id.toString() !== hotelId)
        : [...favourites, hotel],
    },
  };

  try {
    const user = await User.findOneAndUpdate({ _id: request.user[0] }, update, {
      returnOriginal: false,
    })
      .select('-password')
      .populate('favourites');
    response.status(200).json({ user, hotel });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};


async function registerUser(request, response) {
  const { email, displayName, password } = request.body;
  try {
    await signup(email, displayName, password);

    response.status(200).json({ message: 'Successfully signed up' });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}

async function loginUser(request, response) {
  const { password } = request.body;

  try {
    const user = await login(request.body.email, password);
    const { _id, displayName, email, role, favourites } = user;
    const token = createToken(_id);

    response.status(200).json({ user: { _id, displayName, email, role, favourites }, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}


module.exports = {
  registerUser,
  loginUser,
  updateSavedHotels
};

const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const signup = require('../utils/signup');
const login = require('../utils/login');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

async function getFavourites(request, response) {

  try {
    const {favourites} = await User.findOne({_id: request.user[0]})

    response.status(200).json(favourites);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}


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

    response.status(200).json({ user: { _id, displayName, email, role }, token });
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
}


module.exports = {
  registerUser,
  loginUser,
  getFavourites
};

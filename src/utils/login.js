const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function login(email, password) {
  if (!email || !password) {
    throw new Error('All fields must be filled');
  }

  const user = await User.findOne({ email }).populate('favourites');

  if (!user) {
    throw new Error('Wrong username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error('Wrong password');
  }

  return user;
}

module.exports = login;

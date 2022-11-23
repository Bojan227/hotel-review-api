const User = require('../models/userModel');

const bcrypt = require('bcrypt');
const validator = require('validator');
async function signup(email, displayName, password) {
  // validation
  if (!email || !displayName || !password) {
    throw new Error('All fields must be filled');
  }

  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  //   check if email is already in usse
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error('Email already in use');
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    email,
    password: hash,
    displayName,
    role: 'regular',
  });

  return newUser;
}

module.exports = signup;

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (data) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: 'User already exists' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw { status: 400, message: 'Invalid credentials' };
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw { status: 400, message: 'Invalid credentials' };
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

    const userObj = user.toObject();
    delete userObj.password;

    return { user: userObj, token };
};

module.exports = { registerUser, loginUser };
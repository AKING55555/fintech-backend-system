const authService = require('../services/authService');
const User = require('../models/User');

const createUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      message: 'User created successfully',
      data: user
    });
  } catch (err) {
    next(err);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { getAllUsers ,createUser };
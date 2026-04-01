const authService = require('../services/authService');

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

module.exports = { createUser };
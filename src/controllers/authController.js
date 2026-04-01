const authService = require('../services/authService');

const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const data = await authService.loginUser(req.body);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login };
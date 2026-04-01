const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected test route
router.get('/test', auth, (req, res) => {
  const userObj = req.user.toObject();
    delete userObj.password;

    res.json({
      message: 'Protected route working',
      user: userObj
    });
});

module.exports = router;
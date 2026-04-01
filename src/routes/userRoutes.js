const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const { createUser } = require('../controllers/userController');

const router = express.Router();

// ONLY ADMIN CAN CREATE USERS
router.post('/', auth, requireRole(['admin']), createUser);

module.exports = router;
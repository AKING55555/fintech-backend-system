const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');
const { createUser ,getAllUsers} = require('../controllers/userController');

const router = express.Router();

// GET all users — admin only
router.get('/', auth, requireRole(['admin']), getAllUsers);
// ONLY ADMIN CAN CREATE USERS
router.post('/', auth, requireRole(['admin']), createUser);

module.exports = router;
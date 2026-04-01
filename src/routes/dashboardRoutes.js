const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

const { getSummary } = require('../controllers/dashboardController');

const router = express.Router();

// 🔥 ONLY ANALYST + ADMIN
router.get('/summary', auth, requireRole(['admin', 'analyst']), getSummary);

module.exports = router;
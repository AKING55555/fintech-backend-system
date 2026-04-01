const express = require('express');
const auth = require('../middleware/authMiddleware');
const requireRole = require('../middleware/roleMiddleware');

const {
  create,
  getAll,
  update,
  remove
} = require('../controllers/recordController');

const router = express.Router();

// READ → ALL ROLES
router.get('/', auth, requireRole(['viewer', 'analyst', 'admin']), getAll);

// WRITE → ADMIN ONLY
router.post('/', auth, requireRole(['admin']), create);
router.put('/:id', auth, requireRole(['admin']), update);
router.delete('/:id', auth, requireRole(['admin']), remove);

module.exports = router;
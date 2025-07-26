// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { getMessagesByDeal } = require('../controllers/chatController');
const auth = require('../middleware/authMiddleware');

router.get('/:dealId', auth.protect, getMessagesByDeal);

module.exports = router;

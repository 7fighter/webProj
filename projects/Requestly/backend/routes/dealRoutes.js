// routes/dealRoutes.js
const express = require('express');
const router = express.Router();
const { createDeal, getDealsForSeller } = require('../controllers/dealController');
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Seller makes an offer on a request
router.post('/:requestId', auth.protect, authorizeRoles('seller'), createDeal);

// Seller views their deals
router.get('/mine', auth.protect, authorizeRoles('seller'), getDealsForSeller);

module.exports = router;

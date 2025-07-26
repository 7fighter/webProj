// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const { createRequest, getBuyerRequests } = require('../controllers/requestController');
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Buyer-only route to create request
router.post('/', auth.protect, authorizeRoles('buyer'), createRequest);

// Buyer-only route to see their requests
router.get('/mine', auth.protect, authorizeRoles('buyer'), getBuyerRequests);

module.exports = router;

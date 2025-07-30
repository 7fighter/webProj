// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const { createRequest, getBuyerRequests, updateRequest, deleteRequest } = require('../controllers/requestController');
const auth = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Buyer-only route to create request
router.post('/', auth.protect, authorizeRoles('buyer'), createRequest);

// Buyer-only route to see their requests
router.get('/mine', auth.protect, authorizeRoles('buyer'), getBuyerRequests);

// Update a request (buyer only)
router.put('/:id', auth.protect, authorizeRoles('buyer'), updateRequest);

// Delete a request (buyer only)
router.delete('/:id', auth.protect, authorizeRoles('buyer'), deleteRequest);

module.exports = router;

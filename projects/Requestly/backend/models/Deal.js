// models/Deal.js
const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'Request' },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  offerPrice: Number,
  message: String,
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Deal', dealSchema);

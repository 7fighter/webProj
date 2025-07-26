// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  budget: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);

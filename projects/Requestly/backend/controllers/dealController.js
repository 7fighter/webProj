// controllers/dealController.js
const Deal = require('../models/Deal');

exports.createDeal = async (req, res) => {
  try {
    const { offerPrice, message } = req.body;
    const deal = await Deal.create({
      requestId: req.params.requestId,
      sellerId: req.user.id,
      offerPrice,
      message
    });
    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDealsForSeller = async (req, res) => {
  try {
    const deals = await Deal.find({ sellerId: req.user.id }).populate('requestId');
    res.json(deals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

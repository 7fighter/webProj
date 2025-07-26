// controllers/chatController.js
const Message = require('../models/Message');

exports.getMessagesByDeal = async (req, res) => {
  try {
    const messages = await Message.find({ dealId: req.params.dealId })
      .sort({ timestamp: 1 })
      .populate('senderId', 'name role');

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

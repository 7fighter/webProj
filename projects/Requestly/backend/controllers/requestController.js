// controllers/requestController.js
const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, budget } = req.body;
    // console.log(req.body)
    const request = await Request.create({
      title,
      description,
      category,
      budget,
      createdBy: req.user.id
    });
    const io = req.app.get('io'); // Make sure you set io in your app.js/server.js
    io.emit('newRequest', request); // Broadcast to all sellers
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBuyerRequests = async (req, res) => {
  try {
    const requests = await Request.find({ createdBy: req.user.id });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

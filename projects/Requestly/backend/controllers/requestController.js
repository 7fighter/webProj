// controllers/requestController.js
const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const { title, description, category, budget } = req.body;
    const request = await Request.create({
      title,
      description,
      category,
      budget,
      createdBy: req.user.id
    });
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

const Feedback = require('../models/feedback');

const listFeedback = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const items = await Feedback.find({ session: sessionId }).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFeedback = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { authorName, message, rating } = req.body;
    const f = new Feedback({ session: sessionId, authorName, message, rating });
    const saved = await f.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listFeedback, createFeedback };

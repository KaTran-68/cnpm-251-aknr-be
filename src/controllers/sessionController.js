const Session = require('../models/session');

const listSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ date: -1 });
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSession = async (req, res) => {
  try {
    const s = new Session({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
    });
    const saved = await s.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listSessions, getSession, createSession };

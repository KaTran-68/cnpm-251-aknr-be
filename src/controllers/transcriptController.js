const Transcript = require('../models/transcript');
const Session = require('../models/session');

const createTranscript = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });

    const { subject, content, detailsLink } = req.body;
    // overwrite existing transcript or create new
    const existing = await Transcript.findOne({ session: sessionId });
    if (existing) {
      existing.subject = subject || existing.subject;
      existing.content = content || existing.content;
      existing.detailsLink = detailsLink || existing.detailsLink;
      existing.updatedAt = new Date();
      return res.status(200).json(existing);
    }

    const t = new Transcript({ session: sessionId, subject, content, detailsLink });
    const saved = await t.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTranscript = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const t = await Transcript.findOne({ session: sessionId });
    if (!t) return res.status(404).json({ message: 'Transcript not found' });
    res.status(200).json(t);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTranscript, getTranscript };

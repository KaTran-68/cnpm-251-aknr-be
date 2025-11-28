const Attendance = require('../models/attendance');
const Session = require('../models/session');

const listAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const items = await Attendance.find({ session: sessionId }).sort({ timestamp: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { studentName, studentId, status } = req.body;
    const att = new Attendance({ session: sessionId, studentName, studentId, status });
    const saved = await att.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tutor sets attendance password for a session
const setAttendancePassword = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { password } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    session.setAttendancePassword(password);
    res.status(200).json({ message: 'Password set' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Student confirms attendance by providing the password
const confirmAttendance = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { password, studentName, studentId } = req.body;
    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: 'Session not found' });
    if (!session.checkAttendancePassword(password)) return res.status(401).json({ message: 'Invalid password' });
    const att = new Attendance({ session: sessionId, studentName, studentId, status: 'present' });
    const saved = await att.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listAttendance, markAttendance, setAttendancePassword, confirmAttendance };

const express = require('express');
const router = express.Router();
const { listSessions, getSession, createSession } = require('../controllers/sessionController');
const { listAttendance, markAttendance, setAttendancePassword, confirmAttendance } = require('../controllers/attendanceController');
const { listQuizzesForSession, submitQuiz, createQuiz } = require('../controllers/quizController');
const { listFeedback, createFeedback } = require('../controllers/feedbackController');

// Sessions
router.get('/', listSessions);
router.post('/', createSession);
router.get('/:id', getSession);

// Attendance endpoints
router.get('/:sessionId/attendance', listAttendance);
router.post('/:sessionId/attendance', markAttendance);
// Tutor sets attendance password
router.post('/:sessionId/attendance/password', setAttendancePassword);
// Student confirms attendance by entering password
router.post('/:sessionId/attendance/confirm', confirmAttendance);

// Quizzes
router.get('/:sessionId/quizzes', listQuizzesForSession);
router.post('/:sessionId/quizzes', createQuiz);
router.post('/quizzes/:quizId/submit', submitQuiz);

// Feedback
router.get('/:sessionId/feedback', listFeedback);
router.post('/:sessionId/feedback', createFeedback);

// Transcript (biên bản buổi học)
const { createTranscript, getTranscript } = require('../controllers/transcriptController');
router.post('/:sessionId/transcript', createTranscript);
router.get('/:sessionId/transcript', getTranscript);

module.exports = router;

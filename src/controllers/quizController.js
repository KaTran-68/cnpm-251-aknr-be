const Quiz = require('../models/quiz');
const QuizSubmission = require('../models/quizSubmission');

const createQuiz = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { title, questions } = req.body; // questions: [{text, options, correctIndex}]
    const q = new Quiz({ session: sessionId, title, questions });
    const saved = await q.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listQuizzesForSession = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const quizzes = await Quiz.find({ session: sessionId });
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { studentName, answers } = req.body; // answers: [index, ...]
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    if (Array.isArray(answers)) {
      answers.forEach((ans, idx) => {
        const q = quiz.questions[idx];
        if (q && typeof q.correctIndex === 'number' && q.correctIndex === ans) score += 1;
      });
    }

    const submission = new QuizSubmission({ quiz: quizId, session: quiz.session, studentName, answers, score });
    const saved = await submission.save();
    res.status(201).json({ submission: saved, score });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { listQuizzesForSession, submitQuiz, createQuiz };

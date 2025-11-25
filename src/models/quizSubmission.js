// In-memory QuizSubmission model
const submissions = [];
let __subId = 1;
function genId() { return String(__subId++); }

class QuizSubmission {
  constructor(data) {
    this._id = data._id || genId();
    this.quiz = data.quiz;
    this.session = data.session || null;
    this.studentName = data.studentName || '';
    this.answers = Array.isArray(data.answers) ? data.answers : [];
    this.score = typeof data.score === 'number' ? data.score : 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    submissions.push(this);
    return this;
  }
}

module.exports = QuizSubmission;

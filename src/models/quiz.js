// In-memory Quiz model
const quizzes = [];
let __quizId = 1;
function genId() { return String(__quizId++); }

class Quiz {
	constructor(data) {
		this._id = data._id || genId();
		this.session = data.session;
		this.title = data.title || '';
		this.questions = Array.isArray(data.questions) ? data.questions : [];
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}
	async save() {
		quizzes.push(this);
		return this;
	}
	static find(filter) {
		const results = (!filter || Object.keys(filter).length === 0)
			? quizzes.slice()
			: quizzes.filter(q => Object.entries(filter).every(([k,v]) => q[k] == v));
		return {
			then: (cb) => Promise.resolve(results).then(cb),
		};
	}
	static async findById(id) {
		return quizzes.find(q => q._id === id) || null;
	}
}

module.exports = Quiz;

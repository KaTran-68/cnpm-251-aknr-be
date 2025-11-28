// In-memory Transcript model (for session minutes/notes)
const transcripts = [];
let __transId = 1;
function genId() { return String(__transId++); }

class Transcript {
  constructor(data) {
    this._id = data._id || genId();
    this.session = data.session; // session id
    this.subject = data.subject || '';
    this.content = data.content || '';
    this.detailsLink = data.detailsLink || '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    transcripts.push(this);
    return this;
  }
  static async findOne(filter) {
    return transcripts.find(t => Object.entries(filter).every(([k,v]) => t[k] == v)) || null;
  }
}

module.exports = Transcript;

// In-memory Session model (simple, does not persist)
const sessions = [];
let __sessionId = 1;
function genId() { return String(__sessionId++); }

class Session {
  constructor(data) {
    this._id = data._id || genId();
    this.title = data.title || '';
    this.date = data.date ? new Date(data.date) : new Date();
    this.location = data.location || '';
    this.description = data.description || '';
    // optional attendance password (plain-text for demo only)
    this.attendancePassword = data.attendancePassword || null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    sessions.push(this);
    return this;
  }
  setAttendancePassword(pw) {
    this.attendancePassword = pw || null;
    this.updatedAt = new Date();
    return this;
  }
  checkAttendancePassword(pw) {
    if (!this.attendancePassword) return false;
    return this.attendancePassword === pw;
  }
  static find(filter) {
    const results = (!filter || Object.keys(filter).length === 0)
      ? sessions.slice()
      : sessions.filter(s => Object.entries(filter).every(([k,v]) => s[k] == v));
    return {
      sort: (sortObj) => {
        const [key, dir] = Object.entries(sortObj)[0];
        const sorted = results.sort((a,b)=> {
          if (a[key] === b[key]) return 0;
          return dir === -1 ? (b[key] > a[key] ? 1 : -1) : (a[key] > b[key] ? 1 : -1);
        });
        return Promise.resolve(sorted);
      },
      then: (cb) => Promise.resolve(results).then(cb),
    };
  }
  static async findById(id) {
    return sessions.find(s => s._id === id) || null;
  }
}

module.exports = Session;

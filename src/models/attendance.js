// In-memory Attendance model
const attendance = [];
let __attId = 1;
function genId() { return String(__attId++); }

class Attendance {
  constructor(data) {
    this._id = data._id || genId();
    this.session = data.session;
    this.studentName = data.studentName;
    this.studentId = data.studentId || null;
    this.status = data.status || 'present';
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    attendance.push(this);
    return this;
  }
  static find(filter) {
    const results = (!filter || Object.keys(filter).length === 0)
      ? attendance.slice()
      : attendance.filter(a => Object.entries(filter).every(([k,v]) => a[k] == v));
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
}

module.exports = Attendance;

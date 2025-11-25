// In-memory Feedback model
const feedbacks = [];
let __fbId = 1;
function genId() { return String(__fbId++); }

class Feedback {
  constructor(data) {
    this._id = data._id || genId();
    this.session = data.session || null;
    this.authorName = data.authorName || '';
    this.message = data.message || '';
    this.rating = typeof data.rating === 'number' ? data.rating : null;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    feedbacks.push(this);
    return this;
  }
  static find(filter) {
    const results = (!filter || Object.keys(filter).length === 0)
      ? feedbacks.slice()
      : feedbacks.filter(f => Object.entries(filter).every(([k,v]) => f[k] == v));
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

module.exports = Feedback;

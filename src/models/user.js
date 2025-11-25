// In-memory hardcoded User model (minimal Mongoose-like API)
const users = [];
let __userId = 1;
function genId() { return String(__userId++); }

class User {
  constructor(data) {
    this._id = data._id || genId();
    this.name = data.name;
    this.age = data.age;
    this.email = data.email;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  async save() {
    users.push(this);
    return this;
  }
  static find(filter) {
    const results = filter && Object.keys(filter).length
      ? users.filter(u => Object.entries(filter).every(([k,v]) => u[k] === v))
      : users.slice();
    return {
      sort: (sortObj) => {
        const [key, dir] = Object.entries(sortObj)[0];
        const sorted = results.sort((a,b)=> (dir === -1 ? (b[key] > a[key]) - (b[key] < a[key]) : (a[key] > b[key]) - (a[key] < b[key])));
        return Promise.resolve(sorted);
      },
      then: (cb) => Promise.resolve(results).then(cb),
    };
  }
  static async findById(id) {
    return users.find(u => u._id === id) || null;
  }
}

module.exports = User;
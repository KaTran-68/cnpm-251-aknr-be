const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true, // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Example', exampleSchema);
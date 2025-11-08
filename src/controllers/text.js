const User = require('../models/user');

// Xử lý logic API để lấy danh sách dữ liệu
const getData = async (req, res) => {
  try {
    const data = await User.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Xử lý logic API để tạo mới dữ liệu
const createData = async (req, res) => {
  try {
    const newItem = new User({
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getData, createData };
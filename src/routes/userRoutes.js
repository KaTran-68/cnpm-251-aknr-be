const express = require('express');
const router = express.Router();
const { getData, createData } = require('../controllers/userController');

// Lấy danh sách dữ liệu
router.get('/', getData);

// Tạo dữ liệu mới
router.post('/', createData);

module.exports = router;
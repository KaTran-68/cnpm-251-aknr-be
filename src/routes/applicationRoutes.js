const express = require('express');
const router = express.Router();
const { getData, updateStatus } = require('../controllers/applicationController');

// Lấy danh sách dữ liệu
router.get('/', getData);

router.patch('/:email/status', updateStatus);
// Tạo dữ liệu mới
//router.post('/', createData);

module.exports = router;
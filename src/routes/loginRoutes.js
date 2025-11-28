const express = require('express');
const router = express.Router();
const {loginAdmin, loginStudent, loginTeacher, loginTutor} = require('../controllers/loginController')


router.post('/admin', loginAdmin);

router.post('/student', loginStudent);

router.post('/teacher', loginTeacher);

router.post('/tutor', loginTutor);

module.exports = router;
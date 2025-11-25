const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const classRoutes = require('./routes/classRoutes');
const applicationRoutes = require('./routes/applicationRoutes');

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Đăng ký Routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/class', classRoutes);
app.use('/api/applications', applicationRoutes);

module.exports = app;
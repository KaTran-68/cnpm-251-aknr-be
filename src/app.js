const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Đăng ký Routes
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

module.exports = app;
const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const studentRoutes = require('./routes/studentRoutes');
const tutorRoutes = require('./routes/tutorRoutes');
const classRoutes = require('./routes/classRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const loginRoutes = require('./routes/loginRoutes')
const configCors = require("./config/cors");

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configCors(app)

// Health check / root route
app.get('/', (req, res) => {
	res.status(200).send('API is running. Use /api/users or /api/sessions');
});

// Đăng ký Routes
app.use('/api/users', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/tutor', tutorRoutes);
app.use('/api/class', classRoutes);
app.use('/api/applications', applicationRoutes);

module.exports = app;
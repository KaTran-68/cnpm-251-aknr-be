const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

// Middleware cơ bản
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check / root route
app.get('/', (req, res) => {
	res.status(200).send('API is running. Use /api/users or /api/sessions');
});

// Đăng ký Routes
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);

module.exports = app;
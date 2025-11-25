require('dotenv').config(); // Đọc biến môi trường từ file .env
const connectDB = require('./config/db'); // Import file kết nối database
const app = require('./app');

const PORT = process.env.PORT || 6868;

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

// If MONGO_URI is provided, attempt DB connect first. Otherwise run in in-memory demo mode.
if (process.env.MONGO_URI) {
  connectDB().then(startServer).catch(error => {
    console.error('Failed to start server (DB connect failed):', error);
  });
} else {
  console.log('No MONGO_URI provided — running in in-memory demo mode');
  startServer();
}
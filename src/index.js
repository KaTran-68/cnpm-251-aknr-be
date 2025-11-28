require('dotenv').config(); // Đọc biến môi trường từ file .env
const connectDB = require('./config/db'); // Import file kết nối database
const app = require('./app');
const configCors = require("./config/cors");
const PORT = process.env.PORT || 6868;

configCors(app)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


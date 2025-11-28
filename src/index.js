require('dotenv').config(); // Đọc biến môi trường từ file .env
const connectDB = require('./config/db'); // Import file kết nối database
const app = require('./app');
const cors = require('cors');
const PORT = process.env.PORT || 6868;

app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


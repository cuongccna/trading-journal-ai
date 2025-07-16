// index.js
require('dotenv').config(); // Tải biến môi trường
const express = require('express');
const cors = require('cors');
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

// --- Khởi tạo Firebase ---
// SDK sẽ tự động tìm key từ biến môi trường GOOGLE_APPLICATION_CREDENTIALS
initializeApp();
const db = getFirestore();
console.log("✅ Đã kết nối thành công tới Firestore.");

// --- Khởi tạo Express App ---
const app = express();
app.use(cors());       // Cho phép cross-origin requests
app.use(express.json()); // Middleware để đọc JSON từ body của request

// --- Định nghĩa Routes ---
app.get('/', (req, res) => {
  res.send('Chào mừng đến với Trading Journal AI API!');
});

// --- Khởi chạy Server ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
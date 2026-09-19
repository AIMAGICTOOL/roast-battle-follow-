const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Frontend Files (public folder)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas Connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('❌ MONGO_URI missing in .env file!');
} else {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('🔥 MongoDB Atlas Connected Successfully!'))
    .catch((err) => console.error('❌ DB Connection Error:', err));
}

// Basic Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'RoastBattle Arena API Running 🔥' });
});

// Serve Frontend for Root Path
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

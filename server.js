const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas Connection Handling
const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined.");
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('🔥 MongoDB Atlas Connected!');
  } catch (err) {
    console.error('❌ DB Connection Error:', err.message);
  }
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Import API Routes
const postRoutes = require('./routes/postRoutes');
app.use('/api/posts', postRoutes);

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'active', message: 'RoastBattle Arena API Running 🔥' });
});

// Local Development Listen
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

const express = require('express');
const path = require('path');

const app = express();

// Express static middleware to serve CSS & JS
app.use(express.static(path.join(__dirname, '../public')));

// Fallback to serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;

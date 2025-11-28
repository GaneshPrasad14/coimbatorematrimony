const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

// DB connection
const connectDB = require('./config/database');

// Routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profiles');

// Init app
const app = express();

// Connect DB
connectDB();

// Security
app.use(helmet());

// Rate limiting for API
app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests. Try again later.'
  })
);

// Allowed origins
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:8082',
  'http://localhost:5173', // Vite default
  'https://coimbatorematrimony.in',
  'https://www.coimbatorematrimony.in',
  process.env.FRONTEND_URL
].filter(Boolean);

// CORS
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn('❌ Blocked CORS origin:', origin);
        return callback(null, false); // Do NOT throw errors
      }
    },
    credentials: true
  })
);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);

// Health
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Coimbatore Matrimony API Running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler for API only
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Global error:', err);

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ success: false, message: 'File too large (max 5MB)' });
  }

  return res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Server error' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
});

module.exports = app;

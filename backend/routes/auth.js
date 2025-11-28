const express = require('express');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// -----------------------------
// ADMIN CREDENTIALS
// -----------------------------
// These should be in your .env file ideally:
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@coimbatorematrimony.in';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Matrimony@2424$'; 

// -----------------------------
// POST /api/auth/admin/login
// -----------------------------
router.post(
  '/admin/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty().trim()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { email, password } = req.body;

      // Check email & password
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Create JWT token
      const token = jwt.sign(
        { email: ADMIN_EMAIL, role: 'admin' },
        process.env.JWT_SECRET || 'fallback-secret-key',
        { expiresIn: '24h' }
      );

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        admin: {
          email: ADMIN_EMAIL,
          role: 'admin'
        }
      });

    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error during login'
      });
    }
  }
);

// -----------------------------
// POST /api/auth/verify
// -----------------------------
router.post('/verify', (req, res) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Missing Authorization header'
      });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'fallback-secret-key'
    );

    return res.json({
      success: true,
      admin: decoded
    });

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
});

module.exports = router;

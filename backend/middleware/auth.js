const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const header = req.header('Authorization');

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No valid Authorization header.'
      });
    }

    const token = header.split(' ')[1];

    if (!token || token === 'null' || token === 'undefined') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or missing token.'
      });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: 'Server error: JWT_SECRET is missing'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error);

    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.'
    });
  }
};

module.exports = auth;

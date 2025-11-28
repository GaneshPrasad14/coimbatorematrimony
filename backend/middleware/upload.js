const multer = require('multer');

// Memory storage
const memoryStorage = multer.memoryStorage();

// Allowed image types
const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'image/webp'
];

// File filter
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, PNG, and WEBP image files are allowed!'), false);
  }
};

// Multer config
const upload = multer({
  storage: memoryStorage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 10
  }
});

// Multiple images — support flexible field names
const uploadMultiple = (req, res, next) => {
  const handler = upload.any(); // any field name allowed

  handler(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(400).json({
        success: false,
        message: err.message
      });
    } else if (err) {
      // File filter errors or others
      return res.status(400).json({
        success: false,
        message: err.message || 'File upload error'
      });
    }

    next();
  });
};

// For single image if needed
const uploadSingle = (req, res, next) => {
  const handler = upload.single('image');

  handler(req, res, function (err) {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

module.exports = {
  upload,
  uploadSingle,
  uploadMultiple
};

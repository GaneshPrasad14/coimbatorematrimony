const express = require('express');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');

const router = express.Router();

// Validation rules
const profileValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
  body('age').isInt({ min: 18, max: 100 }).withMessage('Age must be between 18 and 100'),
  body('gender').isIn(['male', 'female']).withMessage('Gender must be male or female'),
  body('occupation').trim().isLength({ min: 2, max: 100 }).withMessage('Occupation must be 2-100 characters'),
  body('location').trim().isLength({ min: 2, max: 100 }).withMessage('Location must be 2-100 characters'),
  body('description').trim().isLength({ min: 1, max: 1000 }).withMessage('Description must be 1-1000 characters'),
  body('dob').isISO8601().withMessage('Date of birth must be a valid date'),
  body('contactNumber').trim().isLength({ min: 10, max: 15 }).withMessage('Contact number must be 10-15 characters'),
  body('whatsappNumber').trim().isLength({ min: 10, max: 15 }).withMessage('WhatsApp number must be 10-15 characters'),
  body('salary').trim().isLength({ min: 1, max: 50 }).withMessage('Salary must be 1-50 characters'),
  body('company').trim().isLength({ min: 2, max: 100 }).withMessage('Company must be 2-100 characters'),
  body('education').trim().isLength({ min: 2, max: 200 }).withMessage('Education must be 2-200 characters'),
  body('address').trim().isLength({ min: 1, max: 500 }).withMessage('Address must be 1-500 characters'),
  body('fatherName').trim().isLength({ min: 2, max: 100 }).withMessage('Father\'s name must be 2-100 characters'),
  body('motherName').trim().isLength({ min: 2, max: 100 }).withMessage('Mother\'s name must be 2-100 characters'),
  body('interests').optional()
];

// @route   GET /api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find({ isActive: true }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: profiles.length,
      data: profiles
    });
  } catch (error) {
    console.error('Get profiles error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profiles'
    });
  }
});

// @route   GET /api/profiles/:id
// @desc    Get single profile
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   POST /api/profiles
// @desc    Create new profile
// @access  Private (Admin)
router.post('/', [auth, uploadMultiple], profileValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    // Check if images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one image is required'
      });
    }

    // Convert images to base64 and store in MongoDB
    const imageData = req.files.map(file => {
      const base64 = file.buffer.toString('base64');
      const mimeType = file.mimetype;
      return `data:${mimeType};base64,${base64}`;
    });

    // Handle interests - ensure it's an array
    let interests = req.body.interests;
    if (typeof interests === 'string') {
      interests = interests.split(',').map(interest => interest.trim()).filter(interest => interest);
    } else if (!Array.isArray(interests)) {
      interests = [];
    }

    const profileData = {
      ...req.body,
      interests: interests,
      images: imageData
    };

    const profile = new Profile(profileData);
    await profile.save();

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: profile
    });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating profile'
    });
  }
});

// @route   PUT /api/profiles/:id
// @desc    Update profile
// @access  Private (Admin)
router.put('/:id', [auth, uploadMultiple], profileValidation, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Handle image updates
    let imageData = profile.images; // Keep existing images

    if (req.files && req.files.length > 0) {
      // Convert new images to base64 and add to existing images
      const newImageData = req.files.map(file => {
        const base64 = file.buffer.toString('base64');
        const mimeType = file.mimetype;
        return `data:${mimeType};base64,${base64}`;
      });
      imageData = [...imageData, ...newImageData];
    }

    // Handle interests - ensure it's an array
    let interests = req.body.interests;
    if (typeof interests === 'string') {
      interests = interests.split(',').map(interest => interest.trim()).filter(interest => interest);
    } else if (!Array.isArray(interests)) {
      interests = profile.interests || []; // Keep existing interests if not provided
    }

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { ...req.body, interests: interests, images: imageData },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   DELETE /api/profiles/:id
// @desc    Delete profile
// @access  Private (Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      });
    }

    // Soft delete by setting isActive to false
    await Profile.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({
      success: true,
      message: 'Profile deleted successfully'
    });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting profile'
    });
  }
});

// @route   GET /api/profiles/stats/summary
// @desc    Get profile statistics
// @access  Private (Admin)
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const totalProfiles = await Profile.countDocuments({ isActive: true });
    const maleProfiles = await Profile.countDocuments({ gender: 'male', isActive: true });
    const femaleProfiles = await Profile.countDocuments({ gender: 'female', isActive: true });

    res.json({
      success: true,
      data: {
        total: totalProfiles,
        male: maleProfiles,
        female: femaleProfiles
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const Profile = require('../models/Profile');
const auth = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');

const router = express.Router();

// -------------------------------------------
// VALIDATION RULES
// -------------------------------------------
const profileValidation = [
  body('name').trim().isLength({ min: 2, max: 100 }),
  body('age').isInt({ min: 18, max: 100 }),
  body('gender').isIn(['male', 'female']),
  body('occupation').trim().isLength({ min: 2, max: 100 }),
  body('location').trim().isLength({ min: 2, max: 100 }),
  body('description').trim().isLength({ min: 1, max: 1000 }),
  body('dob').isISO8601(),
  body('contactNumber').trim().isLength({ min: 10, max: 15 }),
  body('whatsappNumber').trim().isLength({ min: 10, max: 15 }),
  body('salary').trim().isLength({ min: 1, max: 50 }),
  body('company').trim().isLength({ min: 2, max: 100 }),
  body('education').trim().isLength({ min: 2, max: 200 }),
  body('address').trim().isLength({ min: 1, max: 500 }),
  body('fatherName').trim().isLength({ min: 2, max: 100 }),
  body('motherName').trim().isLength({ min: 2, max: 100 }),
  body('interests').optional()
];

// -------------------------------------------
// GET STATS — MOVED ABOVE /:id (IMPORTANT FIX)
// -------------------------------------------
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
    console.error('Stats error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching stats' });
  }
});

// -------------------------------------------
// GET ALL PROFILES
// -------------------------------------------
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
    res.status(500).json({ success: false, message: 'Server error fetching profiles' });
  }
});

// -------------------------------------------
// GET SINGLE PROFILE
// -------------------------------------------
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching profile' });
  }
});

// -------------------------------------------
// CREATE PROFILE (ADMIN ONLY)
// -------------------------------------------
router.post('/', [auth, uploadMultiple], profileValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one image is required' });
    }

    const images = req.files.map(file => {
      return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    });

    const interests =
      typeof req.body.interests === 'string'
        ? req.body.interests.split(',').map(i => i.trim()).filter(Boolean)
        : Array.isArray(req.body.interests)
        ? req.body.interests
        : [];

    const profile = new Profile({
      ...req.body,
      interests,
      images
    });

    await profile.save();

    res.status(201).json({ success: true, message: 'Profile created', data: profile });
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ success: false, message: 'Server error creating profile' });
  }
});

// -------------------------------------------
// UPDATE PROFILE (ADMIN ONLY)
// -------------------------------------------
router.put('/:id', [auth, uploadMultiple], profileValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    // Replace images ONLY if new ones uploaded
    let images = profile.images;
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => {
        return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
      });
    }

    const interests =
      typeof req.body.interests === 'string'
        ? req.body.interests.split(',').map(i => i.trim()).filter(Boolean)
        : Array.isArray(req.body.interests)
        ? req.body.interests
        : profile.interests;

    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { ...req.body, interests, images },
      { new: true, runValidators: true }
    );

    res.json({ success: true, message: 'Profile updated', data: updatedProfile });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ success: false, message: 'Server error updating profile' });
  }
});

// -------------------------------------------
// DELETE PROFILE (SOFT DELETE)
// -------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found' });
    }

    await Profile.findByIdAndUpdate(req.params.id, { isActive: false });

    res.json({ success: true, message: 'Profile deleted' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting profile' });
  }
});

module.exports = router;

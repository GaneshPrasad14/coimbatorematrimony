const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 100
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  occupation: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  location: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  dob: {
    type: Date,
    required: true
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 15
  },
  whatsappNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 15
  },
  salary: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  education: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  address: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  fatherName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  interests: [
    {
      type: String,
      trim: true,
      maxlength: 50
    }
  ],
  images: [
    {
      type: String,
      required: true
    }
  ],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // automatic createdAt + updatedAt
});

// Useful indexes
profileSchema.index({ gender: 1, isActive: 1 });
profileSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Profile', profileSchema);

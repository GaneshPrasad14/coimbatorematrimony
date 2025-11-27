const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age cannot exceed 100']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either male or female'
    }
  },
  occupation: {
    type: String,
    required: [true, 'Occupation is required'],
    trim: true,
    maxlength: [100, 'Occupation cannot exceed 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [100, 'Location cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
    maxlength: [15, 'Contact number cannot exceed 15 characters']
  },
  whatsappNumber: {
    type: String,
    required: [true, 'WhatsApp number is required'],
    trim: true,
    maxlength: [15, 'WhatsApp number cannot exceed 15 characters']
  },
  salary: {
    type: String,
    required: [true, 'Salary is required'],
    trim: true,
    maxlength: [50, 'Salary cannot exceed 50 characters']
  },
  company: {
    type: String,
    required: [true, 'Company is required'],
    trim: true,
    maxlength: [100, 'Company cannot exceed 100 characters']
  },
  education: {
    type: String,
    required: [true, 'Education is required'],
    trim: true,
    maxlength: [200, 'Education cannot exceed 200 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxlength: [500, 'Address cannot exceed 500 characters']
  },
  fatherName: {
    type: String,
    required: [true, 'Father\'s name is required'],
    trim: true,
    maxlength: [100, 'Father\'s name cannot exceed 100 characters']
  },
  motherName: {
    type: String,
    required: [true, 'Mother\'s name is required'],
    trim: true,
    maxlength: [100, 'Mother\'s name cannot exceed 100 characters']
  },
  interests: [{
    type: String,
    trim: true,
    maxlength: [50, 'Each interest cannot exceed 50 characters']
  }],
  images: [{
    type: String,
    required: true
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for better query performance
profileSchema.index({ gender: 1, isActive: 1 });
profileSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Profile', profileSchema);
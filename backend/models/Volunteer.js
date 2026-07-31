const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const volunteerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  availability: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Weekends', 'Flexible'],
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  profilePicture: {
    type: String,
    default: ''
  },
  emailNotifications: {
    onJoin: { type: Boolean, default: true },
    onMessages: { type: Boolean, default: true },
    onUpdates: { type: Boolean, default: true }
  },
  joinedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Hash password before saving
volunteerSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
volunteerSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('Volunteer', volunteerSchema);

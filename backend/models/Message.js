const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: true
  },
  volunteerEmail: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['general', 'inquiry', 'feedback', 'help_request'],
    default: 'general'
  },
  attachments: {
    type: [String],
    default: []
  },
  readByAdmin: {
    type: Boolean,
    default: false
  },
  adminResponse: {
    type: String,
    default: null
  },
  respondedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Message', messageSchema);

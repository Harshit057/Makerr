const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  isQuoteRequest: {
    type: Boolean,
    default: false
  },
  requestedServices: {
    type: [{
      id: String,  // Changed from Number to String to handle MongoDB ObjectIds
      title: String,
      category: String
    }],
    default: []
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contact', contactSchema);

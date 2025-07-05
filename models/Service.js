const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  features: [{
    type: String,
    required: true
  }],
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['development', 'marketing', 'design', 'security', 'consulting']
  },
  price: {
    type: String,
    default: 'Contact for pricing'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
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

// Add indexes for better query performance
serviceSchema.index({ isActive: 1, order: 1 });
serviceSchema.index({ category: 1, isActive: 1 });
serviceSchema.index({ order: 1, createdAt: 1 });

// Update the updatedAt field before saving
serviceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Service', serviceSchema);

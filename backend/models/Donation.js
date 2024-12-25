const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    description: String
  }],
  pickupAddress: {
    type: String,
    required: true
  },
  pickupDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);

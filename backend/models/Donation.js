const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donationType: {
    type: String,
    enum: ['clothes', 'fund'],
    required: true
  },
  // For clothes donation
  items: [{
    type: {
      type: String,
      required: function() { return this.donationType === 'clothes'; }
    },
    quantity: {
      type: Number,
      required: function() { return this.donationType === 'clothes'; }
    },
    description: String,
    photo: {
      public_id: String,
      url: String
    }
  }],
  pickupAddress: {
    type: String,
    required: function() { return this.donationType === 'clothes'; }
  },
  pickupDate: {
    type: Date,
    required: function() { return this.donationType === 'clothes'; }
  },
  // For fund donation
  amount: {
    type: Number,
    required: function() { return this.donationType === 'fund'; }
  },
  paymentId: {
    type: String,
    required: function() { return this.donationType === 'fund'; }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);

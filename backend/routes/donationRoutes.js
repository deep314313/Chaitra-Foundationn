const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const { upload } = require('../config/cloudinary');
const razorpay = require('../config/razorpay');
const auth = require('../middleware/auth');
const crypto = require('crypto');

// Create clothes donation with photos
router.post('/clothes', auth, upload.array('photos', 5), async (req, res) => {
  try {
    const { items, pickupAddress, pickupDate } = req.body;
    let parsedItems;
    try {
      parsedItems = JSON.parse(items);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid items format' });
    }

    // Add photo information to each item
    const itemsWithPhotos = parsedItems.map((item, index) => ({
      ...item,
      photo: req.files && req.files[index] ? {
        public_id: req.files[index].filename,
        url: req.files[index].path
      } : null
    }));

    const donation = new Donation({
      user: req.user._id, 
      donationType: 'clothes',
      items: itemsWithPhotos,
      pickupAddress,
      pickupDate
    });

    await donation.save();
    res.status(201).json({ message: 'Clothes donation created successfully', donation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating clothes donation', error: error.message });
  }
});

// Create fund donation order
router.post('/fund/create-order', auth, async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (!amount || isNaN(amount) || amount < 1) {
      return res.status(400).json({ message: 'Invalid amount. Please provide a valid number greater than 0.' });
    }

    const amountInPaise = Math.round(parseFloat(amount) * 100);
    
    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: 'receipt_' + Date.now(),
      notes: {
        userId: req.user._id.toString()
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (error) {
    if (error.statusCode === 401) {
      return res.status(401).json({ 
        message: 'Razorpay authentication failed. Please check API credentials.',
        error: error.message
      });
    }

    res.status(500).json({ 
      message: 'Error creating fund donation order',
      error: error.message
    });
  }
});

// Verify and save fund donation
router.post('/fund/verify', auth, async (req, res) => {
  try {
    const { amount, paymentId, orderId, signature } = req.body;

    if (!amount || !paymentId || !orderId || !signature) {
      return res.status(400).json({ 
        message: 'Missing required payment information'
      });
    }

    // Verify the payment signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: 'Invalid payment signature' });
    }

    // Verify payment status with Razorpay
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.status !== 'captured') {
      return res.status(400).json({ 
        message: 'Payment not captured',
        status: payment.status
      });
    }

    // Create donation record
    const donation = new Donation({
      user: req.user._id,
      donationType: 'fund',
      amount: amount / 100,
      paymentId,
      orderId,
      status: 'completed'
    });

    await donation.save();
    res.json({ 
      message: 'Fund donation successful',
      donation 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error verifying fund donation',
      error: error.message
    });
  }
});

// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 }); 
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

module.exports = router;

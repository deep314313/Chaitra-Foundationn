const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Donation = require('../models/Donation');
const auth = require('../middleware/auth');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Create donation
router.post('/', auth, async (req, res) => {
  try {
    const { items, pickupAddress, pickupDate } = req.body;
    
    const donation = new Donation({
      user: req.user._id,
      items,
      pickupAddress,
      pickupDate
    });

    await donation.save();

    // Send email confirmation
    try {
      console.log('Sending email to:', req.user.email);
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: req.user.email,
        subject: 'Donation Confirmation - Chaitra Foundation',
        html: `
          <h2>Thank you for your donation!</h2>
          <p>Your donation has been registered successfully.</p>
          <p>Pickup Details:</p>
          <ul>
            <li>Date: ${new Date(pickupDate).toLocaleDateString()}</li>
            <li>Address: ${pickupAddress}</li>
          </ul>
          <p>Items Donated:</p>
          <ul>
            ${items.map(item => `
              <li>${item.quantity} ${item.type}${item.description ? ` - ${item.description}` : ''}</li>
            `).join('')}
          </ul>
          <p>We will contact you shortly to confirm the pickup.</p>
          <p>Thank you for your generosity!</p>
          <br>
          <p>Best regards,</p>
          <p>Chaitra Foundation Team</p>
        `
      };
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email sending failed:', error);
    }

    res.status(201).json({
      success: true,
      message: 'Donation registered successfully',
      donation
    });
  } catch (error) {
    console.error('Donation creation failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's donations
router.get('/my-donations', auth, async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

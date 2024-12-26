const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      phone
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Profile photo upload
router.put('/profile-photo', auth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No photo provided' });
    }

    console.log('File received:', req.file); // Debug log

    const user = await User.findById(req.user._id);
    if (!user) {
      // If old photo exists, delete it from Cloudinary
      if (req.file.public_id) {
        await cloudinary.uploader.destroy(req.file.public_id);
      }
      return res.status(404).json({ message: 'User not found' });
    }

    // If user already has a profile photo, delete it from Cloudinary
    if (user.profilePhoto && user.profilePhoto.public_id) {
      try {
        await cloudinary.uploader.destroy(user.profilePhoto.public_id);
      } catch (error) {
        console.error('Error deleting old photo:', error);
      }
    }

    user.profilePhoto = {
      public_id: req.file.public_id || req.file.filename,
      url: req.file.path || req.file.secure_url
    };

    console.log('Profile photo data:', user.profilePhoto); // Debug log

    await user.save();
    
    // Remove sensitive information before sending response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({ 
      message: 'Profile photo updated successfully', 
      user: userResponse,
      photo: user.profilePhoto // Include photo details in response
    });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    // If upload failed, try to delete the uploaded file
    if (req.file && req.file.public_id) {
      try {
        await cloudinary.uploader.destroy(req.file.public_id);
      } catch (deleteError) {
        console.error('Error deleting failed upload:', deleteError);
      }
    }
    res.status(500).json({ 
      message: 'Error updating profile photo', 
      error: error.message,
      details: error.stack
    });
  }
});

// Get User Profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

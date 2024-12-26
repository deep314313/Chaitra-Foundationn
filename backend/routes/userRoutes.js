const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { upload } = require('../config/cloudinary');
const auth = require('../middleware/auth');

// Update user profile photo
router.put('/profile-photo', auth, upload.single('photo'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePhoto = {
      public_id: req.file.filename,
      url: req.file.path
    };

    await user.save();
    res.json({ message: 'Profile photo updated successfully', user });
  } catch (error) {
    console.error('Error updating profile photo:', error);
    res.status(500).json({ message: 'Error updating profile photo' });
  }
});

module.exports = router;

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get the complete user object from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      throw new Error();
    }
    
    // Attach the complete user object to the request
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication required' });
  }
};

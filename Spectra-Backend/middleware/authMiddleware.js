const jwt = require('jsonwebtoken');
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET 

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is invalid or expired' });
  }
};

module.exports = protect

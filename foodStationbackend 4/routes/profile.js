import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../modals/User.js';
import { body, validationResult } from 'express-validator';

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallbacksecret';

// Middleware for authenticating JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

// Validation middleware
const validateProfileUpdate = [
  body('email').optional().isEmail().withMessage('Invalid email format.'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number.'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
];

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, validateProfileUpdate, async (req, res) => {
  const { name, email, currentPassword, password, phone, address } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email is already in use.' });
      }
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    // Update address as an object
    if (address) {
      if (typeof address === 'string') {
        return res.status(400).json({ success: false, message: 'Address must be an object with street, city, state, pinCode, and country fields.' });
      }
      user.address = address;
    }

    if (currentPassword && password) {
      if (!(await bcrypt.compare(currentPassword, user.password))) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }
      user.password = await bcrypt.hash(password, 10);
    } else if (currentPassword || password) {
      return res.status(400).json({ success: false, message: 'Both current and new passwords must be provided.' });
    }

    await user.save();
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, message: 'Profile updated successfully.', user: updatedUser });
  } catch (err) {
    console.error('Error updating profile for user:', req.user.id, err);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;

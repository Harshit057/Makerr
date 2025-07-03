const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// @route   POST /api/admin/register
// @desc    Register admin (only for initial setup)
// @access  Public (in development)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    let admin = await Admin.findOne({ $or: [{ email }, { username }] });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create new admin
    admin = new Admin({
      username,
      email,
      password
    });

    await admin.save();

    // Generate JWT token
    const payload = {
      id: admin._id,
      username: admin.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret', {
      expiresIn: '24h'
    });

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/admin/login
// @desc    Login admin
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username or email
    const admin = await Admin.findOne({
      $or: [{ username }, { email: username }],
      isActive: true
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const payload = {
      id: admin._id,
      username: admin.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback-secret', {
      expiresIn: '24h'
    });

    res.json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/me
// @desc    Get current admin
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    res.json({
      admin: {
        id: req.admin._id,
        username: req.admin.username,
        email: req.admin.email,
        role: req.admin.role,
        lastLogin: req.admin.lastLogin
      }
    });
  } catch (error) {
    console.error('Get admin profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/change-password
// @desc    Change admin password
// @access  Private
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Please provide current and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters' });
    }

    // Get admin with password
    const admin = await Admin.findById(req.admin._id);

    // Check current password
    const isMatch = await admin.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Password updated successfully' });

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/contacts
// @desc    Get all contacts for admin
// @access  Private
router.get('/contacts', auth, async (req, res) => {
  try {
    const { limit = 10, page = 1, status } = req.query;
    const limitNum = parseInt(limit);
    const pageNum = parseInt(page);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    // Get contacts with pagination
    const contacts = await require('../models/Contact').find(query)
      .sort({ createdAt: -1 })
      .limit(limitNum)
      .skip(skip);

    // Get total count for pagination
    const total = await require('../models/Contact').countDocuments(query);

    res.json({
      contacts,
      pagination: {
        current: pageNum,
        pages: Math.ceil(total / limitNum),
        total
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

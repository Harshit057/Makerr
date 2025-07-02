const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Service = require('../models/Service');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    // Get total counts
    const totalContacts = await Contact.countDocuments();
    const pendingContacts = await Contact.countDocuments({ status: 'pending' });
    const completedContacts = await Contact.countDocuments({ status: 'completed' });
    const totalServices = await Service.countDocuments({ isActive: true });

    // Get recent contacts (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentContacts = await Contact.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    // Get contacts by service
    const contactsByService = await Contact.aggregate([
      {
        $group: {
          _id: '$service',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get contacts by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const contactsByMonth = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      stats: {
        totalContacts,
        pendingContacts,
        completedContacts,
        totalServices,
        recentContacts
      },
      charts: {
        contactsByService,
        contactsByMonth
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/admin/dashboard/recent-contacts
// @desc    Get recent contacts
// @access  Private
router.get('/recent-contacts', auth, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .select('name email service status createdAt');

    res.json({ contacts: recentContacts });

  } catch (error) {
    console.error('Recent contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/admin/dashboard/contact/:id/status
// @desc    Update contact status
// @access  Private
router.put('/contact/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'contacted', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json({
      message: 'Contact status updated successfully',
      contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

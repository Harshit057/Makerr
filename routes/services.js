const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// Default services data for seeding
const defaultServices = [
  {
    title: 'App Development',
    description: 'Custom mobile applications for iOS and Android platforms using React Native, Flutter, and native technologies.',
    features: ['Cross-platform development', 'Native performance', 'App Store deployment', 'Maintenance & support'],
    icon: 'phone_android',
    category: 'development',
    order: 1
  },
  {
    title: 'Web Development',
    description: 'Modern, responsive websites and web applications built with cutting-edge technologies.',
    features: ['Responsive design', 'E-commerce solutions', 'CMS integration', 'SEO optimization'],
    icon: 'web',
    category: 'development',
    order: 2
  },
  {
    title: 'SEO & Marketing',
    description: 'Comprehensive digital marketing strategies to boost your online presence and drive growth.',
    features: ['Search engine optimization', 'Social media marketing', 'Content strategy', 'Analytics & reporting'],
    icon: 'trending_up',
    category: 'marketing',
    order: 3
  },
  {
    title: 'Poster Making',
    description: 'Professional graphic design services for marketing materials, branding, and promotional content.',
    features: ['Custom designs', 'Brand consistency', 'Print-ready formats', 'Social media graphics'],
    icon: 'palette',
    category: 'design',
    order: 4
  },
  {
    title: 'Social Media Management',
    description: 'Complete social media strategy and management to engage your audience and build your brand.',
    features: ['Content creation', 'Community management', 'Ad campaigns', 'Performance tracking'],
    icon: 'share',
    category: 'marketing',
    order: 5
  },
  {
    title: 'Cyber Security',
    description: 'Comprehensive security solutions to protect your business from digital threats and vulnerabilities.',
    features: ['Security audits', 'Penetration testing', 'Compliance consulting', '24/7 monitoring'],
    icon: 'security',
    category: 'security',
    order: 6
  },
  {
    title: 'System Solutions',
    description: 'Custom software solutions and system integrations to streamline your business operations.',
    features: ['Custom software', 'System integration', 'Database design', 'Cloud solutions'],
    icon: 'settings',
    category: 'development',
    order: 7
  }
];

// @route   GET /api/services
// @desc    Get all active services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    // Build filter
    const filter = { isActive: true };
    if (category) {
      filter.category = category;
    }
    
    const services = await Service.find(filter)
      .select('title description features icon category')
      .sort({ order: 1, createdAt: 1 })
      .lean(); // Use lean() for better performance
    
    // If no services found, seed with default data
    if (services.length === 0 && !category) {
      await Service.insertMany(defaultServices);
      const newServices = await Service.find(filter)
        .select('title description features icon category')
        .sort({ order: 1, createdAt: 1 })
        .lean();
      
      return res.json({
        services: newServices.map(service => ({
          id: service._id,
          title: service.title,
          description: service.description,
          features: service.features,
          icon: service.icon,
          category: service.category
        })),
        total: newServices.length
      });
    }
    
    res.json({
      services: services.map(service => ({
        id: service._id,
        title: service.title,
        description: service.description,
        features: service.features,
        icon: service.icon,
        category: service.category
      })),
      total: services.length
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
});

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service || !service.isActive) {
      return res.status(404).json({ 
        message: 'Service not found' 
      });
    }
    
    res.json({
      id: service._id,
      title: service.title,
      description: service.description,
      features: service.features,
      icon: service.icon,
      category: service.category,
      price: service.price
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
});

// ADMIN ROUTES

// @route   GET /api/services/admin/all
// @desc    Get all services (including inactive) for admin
// @access  Private
router.get('/admin/all', auth, async (req, res) => {
  try {
    const services = await Service.find({}).sort({ order: 1, createdAt: 1 });
    
    res.json({
      services,
      total: services.length
    });
  } catch (error) {
    console.error('Get admin services error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/services/admin
// @desc    Create new service
// @access  Private
router.post('/admin', auth, async (req, res) => {
  try {
    const { title, description, features, icon, category, price, order } = req.body;

    // Validate required fields
    if (!title || !description || !features || !icon || !category) {
      return res.status(400).json({ 
        message: 'Please provide all required fields' 
      });
    }

    const service = new Service({
      title,
      description,
      features,
      icon,
      category,
      price,
      order: order || 0
    });

    await service.save();

    res.status(201).json({
      message: 'Service created successfully',
      service
    });

  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/services/admin/:id
// @desc    Update service
// @access  Private
router.put('/admin/:id', auth, async (req, res) => {
  try {
    const { title, description, features, icon, category, price, isActive, order } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        features,
        icon,
        category,
        price,
        isActive,
        order,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({
      message: 'Service updated successfully',
      service
    });

  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/services/admin/:id
// @desc    Delete service
// @access  Private
router.delete('/admin/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service deleted successfully' });

  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

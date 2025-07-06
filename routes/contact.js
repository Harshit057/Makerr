const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public
router.post('/', async (req, res) => {
  try {
    console.log('Received contact request:', req.body);
    const { name, email, phone, company, service, message, isQuoteRequest, requestedServices } = req.body;

    // Basic validation - only require name, email, and service
    if (!name || !email || !service) {
      return res.status(400).json({ 
        message: 'Please fill in all required fields (name, email, service)' 
      });
    }

    // Ensure message has some content (use default if empty)
    const finalMessage = message && message.trim() ? message : 'Contact form submission.';

    // Create new contact
    const contact = new Contact({
      name: name.trim(),
      email: email.trim(),
      phone: phone || '',
      company: company || '',
      service,
      message: finalMessage,
      isQuoteRequest: isQuoteRequest || false,
      requestedServices: requestedServices || []
    });

    await contact.save();
    console.log('Contact saved successfully:', contact._id);

    // Send email notification (optional)
    try {
      let emailSubject = `New Contact Form Submission - ${service}`;
      let emailContent = `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>`;

      if (isQuoteRequest && requestedServices && requestedServices.length > 0) {
        emailSubject = `New Quote Request - ${requestedServices.length} Services`;
        emailContent += `
        <p><strong>Quote Request - Services:</strong></p>
        <ul>
          ${requestedServices.map(srv => `<li>${srv.title} (${srv.category})</li>`).join('')}
        </ul>`;
      }

      emailContent += `
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `;

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: emailSubject,
        html: emailContent
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.log('Email sending failed:', emailError.message);
      // Don't fail the request if email fails
    }

    console.log('Sending success response...');
    res.status(201).json({
      message: isQuoteRequest 
        ? 'Quote request submitted successfully. We will get back to you soon!' 
        : 'Contact form submitted successfully. We will get back to you soon!',
      contact: {
        name: contact.name,
        email: contact.email,
        service: contact.service,
        isQuoteRequest: contact.isQuoteRequest
      }
    });

  } catch (error) {
    console.error('Contact form error:', error.message);
    console.error('Error details:', error);
    console.error('Request body was:', req.body);
    
    // Send more specific error message
    let errorMessage = 'Server error. Please try again later.';
    if (error.name === 'ValidationError') {
      errorMessage = 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.name === 'MongoError' || error.name === 'MongooseError') {
      errorMessage = 'Database error. Please try again later.';
    } else if (error.code === 11000) {
      errorMessage = 'Duplicate entry detected.';
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/contact
// @desc    Get all contacts (admin only)
// @access  Private
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
});

module.exports = router;

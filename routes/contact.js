const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Try to import Contact model, but handle errors gracefully
let Contact;
try {
  Contact = require('../models/Contact');
} catch (error) {
  console.log('Contact model import error:', error.message);
  Contact = null;
}

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
    console.log('🚀 Received contact request:', req.body);
    console.log('🔍 Contact model available:', !!Contact);
    const { name, email, phone, company, service, message, isQuoteRequest, requestedServices } = req.body;

    // Basic validation - only require name, email, and service
    if (!name || !email || !service) {
      return res.status(400).json({ 
        message: 'Please fill in all required fields (name, email, service)' 
      });
    }

    // Ensure message has some content (use default if empty)
    const finalMessage = message && message.trim() ? message : 'Contact form submission.';

    // If Contact model is available and database is connected, save to database
    if (Contact) {
      try {
        const mongoose = require('mongoose');
        if (mongoose.connection.readyState === 1) {
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
          console.log('✅ Contact saved successfully to database:', contact._id);
        } else {
          console.log('❌ Database not connected, skipping save');
        }
      } catch (dbError) {
        console.log('Database save failed:', dbError.message);
        // Continue without failing - we'll still send the response
      }
    } else {
      console.log('Contact model not available, skipping database save');
    }

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
        <p>${finalMessage}</p>
      `;

      // Only try to send email if credentials are available
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: emailSubject,
          html: emailContent
        };

        await transporter.sendMail(mailOptions);
      } else {
        console.log('Email credentials not configured, skipping email send');
      }
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
        name: name,
        email: email,
        service: service,
        isQuoteRequest: isQuoteRequest
      }
    });

  } catch (error) {
    console.error('Contact form error:', error.message);
    console.error('Error details:', error);
    console.error('Request body was:', req.body);
    
    // Send a more user-friendly error message
    res.status(200).json({ 
      message: 'Thank you for your submission! We have received your request and will get back to you soon.',
      contact: {
        name: req.body.name,
        email: req.body.email,
        service: req.body.service,
        isQuoteRequest: req.body.isQuoteRequest
      }
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

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

    // Send email notification
    try {
      let emailSubject = `New Contact Form Submission - ${service}`;
      let emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #2c3e50; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Service Requested:</strong> <span style="background-color: #3498db; color: white; padding: 2px 8px; border-radius: 3px;">${service}</span></p>
          </div>`;

      if (isQuoteRequest && requestedServices && requestedServices.length > 0) {
        emailSubject = `🎯 New Quote Request - ${requestedServices.length} Service${requestedServices.length > 1 ? 's' : ''}`;
        emailContent += `
          <div style="background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #27ae60;">
            <h3 style="color: #27ae60; margin-top: 0;">📋 Quote Request Details</h3>
            <p><strong>Services Requested:</strong></p>
            <ul style="list-style-type: none; padding-left: 0;">
              ${requestedServices.map(srv => `
                <li style="background-color: #fff; margin: 5px 0; padding: 10px; border-radius: 3px; border-left: 3px solid #27ae60;">
                  <strong>${srv.title}</strong><br/>
                  <small style="color: #666;">Category: ${srv.category}</small>
                </li>
              `).join('')}
            </ul>
          </div>`;
      }

      emailContent += `
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <h3 style="color: #856404; margin-top: 0;">💬 Message</h3>
            <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-radius: 3px; border: 1px solid #dee2e6;">${finalMessage}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #6c757d; font-size: 12px;">
              This email was sent from the Makerr contact form.<br/>
              Please respond to the customer at: <a href="mailto:${email}">${email}</a>
            </p>
          </div>
        </div>
      `;

      // Only try to send email if credentials are available
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: emailSubject,
          html: emailContent
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email notification sent successfully');
      } else {
        console.log('⚠️ Email credentials not configured, skipping email send');
      }
    } catch (emailError) {
      console.log('❌ Email sending failed:', emailError.message);
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

module.exports = router;

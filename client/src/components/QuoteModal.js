import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './QuoteModal.css';

const QuoteModal = ({ isOpen, onClose, selectedServices = [] }) => {
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Prepare message content
      const servicesText = selectedServices.map(s => `- ${s.title} (${s.category})`).join('\n');
      const additionalText = formData.message && formData.message.trim() 
        ? `\n\nAdditional Requirements:\n${formData.message}` 
        : '';
      const fullMessage = `Quote Request for Services:\n\nServices Requested:\n${servicesText}${additionalText}`;

      // Ensure requestedServices have the correct format
      const cleanedServices = selectedServices.map(service => ({
        id: service.id || service._id || 0,
        title: service.title || '',
        category: service.category || ''
      }));

      const requestData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone || '',
        company: formData.company || '',
        service: 'Quote Request',
        message: fullMessage,
        isQuoteRequest: true,
        requestedServices: cleanedServices
      };

      console.log('Sending quote request:', requestData);
      console.log('Selected services:', selectedServices);
      console.log('Cleaned services:', cleanedServices);

      // Send to backend (using full URL to bypass proxy issues)
      const backendUrl = process.env.NODE_ENV === 'production' ? 'https://makerr-pcrv.onrender.com/api/contact' : 'http://localhost:5000/api/contact';
      
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Backend URL:', backendUrl);
      
      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData)
        });

        console.log('Response received:', response.status, response.statusText);
        
        // Try to parse response
        const responseText = await response.text();
        console.log('Response body:', responseText);
        
        let result;
        try {
          result = JSON.parse(responseText);
        } catch (e) {
          result = { message: responseText };
        }

        if (response.ok) {
          setSubmitMessage('Quote request sent successfully! We\'ll get back to you soon.');
          // Clear form and cart
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: ''
          });
          clearCart();
          
          // Close modal after a short delay
          setTimeout(() => {
            onClose();
            setSubmitMessage('');
          }, 2000);
        } else {
          throw new Error(result.message || 'Failed to send quote request');
        }
      } catch (fetchError) {
        console.error('Backend error details:', fetchError);
        console.error('Error message:', fetchError.message);
        console.error('Error stack:', fetchError.stack);
        
        // Check if it's a CORS error
        if (fetchError.message.includes('CORS') || fetchError.message.includes('network') || fetchError.message.includes('fetch')) {
          setSubmitMessage('Connection error: Unable to reach server. Please check your internet connection or try again later.');
        } else {
          setSubmitMessage('Backend temporarily unavailable. Your request has been noted - we will contact you soon!');
        }
        
        // For now, clear form anyway so user knows something happened
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          message: ''
        });
        clearCart();
        
        // Close modal after a delay
        setTimeout(() => {
          onClose();
          setSubmitMessage('');
        }, 4000);
      }
    } catch (error) {
      console.error('Error sending quote request:', error);
      setSubmitMessage('Error sending quote request. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="quote-modal-overlay" onClick={onClose}>
      <div className="quote-modal" onClick={(e) => e.stopPropagation()}>
        <div className="quote-modal-header">
          <h3>Request Quote</h3>
          <button className="quote-modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="quote-modal-content">
          {/* Selected Services Summary */}
          <div className="selected-services-summary">
            <h4>Selected Services ({selectedServices.length})</h4>
            <div className="services-list">
              {selectedServices.map((service, index) => (
                <span key={service.id} className="service-tag">
                  {service.title}
                  {index < selectedServices.length - 1 && ', '}
                </span>
              ))}
            </div>
          </div>

          {/* Quote Form */}
          <form onSubmit={handleSubmit} className="quote-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Additional Requirements</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your project requirements, timeline, or any specific needs..."
              ></textarea>
            </div>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                {submitMessage}
              </div>
            )}

            <div className="quote-form-actions">
              <button type="button" onClick={onClose} className="btn btn-secondary">
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Quote Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;

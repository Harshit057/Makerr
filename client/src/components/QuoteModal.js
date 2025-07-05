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
      // Prepare the data to send
      const quoteData = {
        ...formData,
        services: selectedServices.map(service => ({
          id: service.id,
          title: service.title,
          category: service.category
        })),
        timestamp: new Date().toISOString()
      };

      // Send to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: 'Quote Request',
          message: `Quote Request for Services:\n\nServices Requested:\n${selectedServices.map(s => `- ${s.title} (${s.category})`).join('\n')}\n\nAdditional Message:\n${formData.message}`,
          isQuoteRequest: true,
          requestedServices: selectedServices
        })
      });

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
        throw new Error('Failed to send quote request');
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

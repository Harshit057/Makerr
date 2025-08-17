import React, { useState, useEffect } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleReply = (contact) => {
    // Open email client with pre-filled information
    const subject = encodeURIComponent(`Re: ${contact.service} - ${contact.isQuoteRequest ? 'Quote Request' : 'Inquiry'}`);
    const body = encodeURIComponent(`Hi ${contact.name},\n\nThank you for your ${contact.isQuoteRequest ? 'quote request' : 'inquiry'} regarding ${contact.service}.\n\nBest regards,\nMakerr Team`);
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`);
  };

  const handleMarkAsContacted = (contactId) => {
    setContacts(prevContacts => 
      prevContacts.map(contact => 
        contact._id === contactId 
          ? { ...contact, status: 'contacted' }
          : contact
      )
    );
  };

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/contacts', {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts || []);
      } else {
        // If API fails, show demo data
        setContacts(getDemoContacts());
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      // Show demo data when backend is not available
      setContacts(getDemoContacts());
    } finally {
      setLoading(false);
    }
  };

  const getDemoContacts = () => [
    {
      _id: '1',
      name: 'Harshit Sharma',
      email: 'harshitsharmasncp1.212@gmail.com',
      phone: '08957688223',
      company: 'Makerr',
      service: 'Poster Making',
      message: 'sdfg',
      isQuoteRequest: false,
      status: 'pending',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890',
      service: 'Web Development',
      message: 'I need a modern website for my business',
      isQuoteRequest: false,
      status: 'pending',
      createdAt: new Date(Date.now() - 86400000).toISOString()
    },
    {
      _id: '3',
      name: 'Jane Smith',
      email: 'jane@company.com',
      phone: '987-654-3210',
      company: 'Tech Corp',
      service: 'Logo Design',
      message: 'Need a professional logo for our startup',
      isQuoteRequest: true,
      requestedServices: [
        { title: 'Logo Design', category: 'design' },
        { title: 'Brand Identity', category: 'design' }
      ],
      status: 'contacted',
      createdAt: new Date(Date.now() - 172800000).toISOString()
    }
  ];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading contacts...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Contacts</h1>
        <p>Manage customer inquiries and messages</p>
      </div>

      <div className="dashboard-section">
        <h2>Contact Messages ({contacts.length})</h2>
        {contacts.length > 0 ? (
          <div className="contacts-list">
            {contacts.map((contact) => (
              <div key={contact._id} className={`contact-item ${contact.isQuoteRequest ? 'quote-request' : ''}`}>
                <div className="contact-header">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                  <div className={`contact-status status-${contact.status}`}>
                    {contact.status || 'pending'}
                  </div>
                </div>
                
                <div className="contact-details">
                  <div className="contact-info-row">
                    <span><strong>Email:</strong> {contact.email}</span>
                    {contact.phone && <span><strong>Phone:</strong> {contact.phone}</span>}
                  </div>
                  
                  {contact.company && (
                    <div className="contact-info-row">
                      <span><strong>Company:</strong> {contact.company}</span>
                    </div>
                  )}
                  
                  <div className="contact-info-row">
                    <span><strong>Service:</strong> {contact.service}</span>
                    {contact.isQuoteRequest && (
                      <span className="quote-badge">Quote Request</span>
                    )}
                  </div>
                  
                  {contact.requestedServices && contact.requestedServices.length > 0 && (
                    <div className="requested-services">
                      <strong>Requested Services:</strong>
                      <div className="services-tags">
                        {contact.requestedServices.map((service, idx) => (
                          <span key={idx} className="service-tag">
                            {service.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="contact-message">
                    <strong>Message:</strong>
                    <p>{contact.message}</p>
                  </div>
                </div>
                
                <div className="contact-actions">
                  <button className="btn btn-primary" onClick={() => handleReply(contact)}>
                    Reply
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleMarkAsContacted(contact._id)}>
                    Mark as Contacted
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-contacts">
            <p>No contact messages found.</p>
            <p>Contact submissions will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
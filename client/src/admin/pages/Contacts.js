import React, { useState, useEffect } from 'react';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

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
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

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
            {contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <div className="contact-info">
                  <div className="contact-name">{contact.name}</div>
                  <div className="contact-email">{contact.email}</div>
                  <div className="contact-subject">{contact.subject}</div>
                  <div className="contact-message">{contact.message}</div>
                </div>
                <div className="contact-date">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No contact messages found.</p>
        )}
      </div>
    </div>
  );
};

export default Contacts;
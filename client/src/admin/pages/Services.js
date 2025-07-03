import React, { useState, useEffect } from 'react';
import './Services.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/services', {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data.services || []);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Services</h1>
        <p>Manage your service offerings</p>
      </div>

      <div className="dashboard-section">
        <h2>Available Services ({services.length})</h2>
        {services.length > 0 ? (
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-item">
                <div className="service-info">
                  <div className="service-title">{service.title}</div>
                  <div className="service-category">{service.category}</div>
                  <div className="service-description">{service.description}</div>
                </div>
                <div className="service-actions">
                  <button className="action-btn">Edit</button>
                  <button className="action-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-section">
            <p>No services configured yet.</p>
            <button className="action-btn">Add New Service</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;
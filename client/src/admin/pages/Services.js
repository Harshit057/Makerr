import React, { useState, useEffect } from 'react';
import './Services.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [],
    icon: '',
    category: '',
    price: '',
    order: 1
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/services/admin/all', {
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

  const handleAddService = () => {
    setFormData({
      title: '',
      description: '',
      features: [],
      icon: '',
      category: '',
      price: '',
      order: 1
    });
    setEditingService(null);
    setShowAddForm(true);
  };

  const handleEditService = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      features: service.features || [],
      icon: service.icon,
      category: service.category,
      price: service.price || '',
      order: service.order || 1
    });
    setEditingService(service);
    setShowAddForm(true);
  };

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm('Are you sure you want to delete this service?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/services/admin/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        fetchServices(); // Refresh the list
      } else {
        alert('Error deleting service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error deleting service');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingService 
        ? `/api/services/admin/${editingService._id}`
        : '/api/services/admin';
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          ...formData,
          features: formData.features.filter(f => f.trim() !== '')
        })
      });

      if (response.ok) {
        setShowAddForm(false);
        fetchServices(); // Refresh the list
      } else {
        alert('Error saving service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeaturesChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
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
        <button 
          className="action-btn primary" 
          onClick={handleAddService}
        >
          Add New Service
        </button>
      </div>

      <div className="dashboard-section">
        <h2>Available Services ({services.length})</h2>
        {services.length > 0 ? (
          <div className="services-grid">
            {services.map((service) => (
              <div key={service._id} className="service-item">
                <div className="service-info">
                  <div className="service-title">{service.title}</div>
                  <div className="service-category">
                    Category: {service.category} | Order: {service.order}
                  </div>
                  <div className="service-description">{service.description}</div>
                  <div className="service-status">
                    Status: {service.isActive ? 'Active' : 'Inactive'}
                  </div>
                  {service.features && service.features.length > 0 && (
                    <div className="service-features">
                      <strong>Features:</strong>
                      <ul>
                        {service.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="service-actions">
                  <button 
                    className="action-btn edit" 
                    onClick={() => handleEditService(service)}
                  >
                    Edit
                  </button>
                  <button 
                    className="action-btn delete" 
                    onClick={() => handleDeleteService(service._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="dashboard-section">
            <p>No services configured yet.</p>
            <button className="action-btn primary" onClick={handleAddService}>
              Add New Service
            </button>
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button 
                className="close-btn" 
                onClick={() => setShowAddForm(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmitForm} className="service-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Category:</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                  <option value="consulting">Consulting</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Icon (Material Icons name):</label>
                <input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  placeholder="e.g., web, phone_android, trending_up"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price (optional):</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., $999, Contact for quote"
                  />
                </div>
                
                <div className="form-group">
                  <label>Order:</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="1"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Features:</label>
                {formData.features.map((feature, index) => (
                  <div key={index} className="feature-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeaturesChange(index, e.target.value)}
                      placeholder="Enter feature"
                    />
                    <button 
                      type="button" 
                      className="remove-btn"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button 
                  type="button" 
                  className="action-btn secondary"
                  onClick={addFeature}
                >
                  Add Feature
                </button>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="action-btn primary">
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
                <button 
                  type="button" 
                  className="action-btn secondary"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
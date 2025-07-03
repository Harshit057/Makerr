import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ admin }) => {
  const [formData, setFormData] = useState({
    username: admin?.username || '',
    email: admin?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Profile updated successfully');
      } else {
        setMessage(data.message || 'Update failed');
      }
    } catch (error) {
      setMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('/api/admin/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password changed successfully');
        setFormData({
          ...formData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage(data.message || 'Password change failed');
      }
    } catch (error) {
      setMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p>Manage your admin account settings</p>
      </div>

      {message && (
        <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Profile Information</h2>
          <form onSubmit={handleProfileUpdate} className="settings-form">
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="action-btn" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>

        <div className="dashboard-section">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordChange} className="settings-form">
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword">New Password:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm New Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="action-btn" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
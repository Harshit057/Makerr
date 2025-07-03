import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalServices: 0,
    pendingMessages: 0,
    activeUsers: 0
  });
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/admin/dashboard/stats', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Fetch recent contacts
      const contactsResponse = await fetch('/api/admin/contacts?limit=5', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json();
        setRecentContacts(contactsData.contacts || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your admin dashboard</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalContacts}</div>
            <div className="stat-label">Total Contacts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🛠️</div>
          <div className="stat-content">
            <div className="stat-number">{stats.totalServices}</div>
            <div className="stat-label">Total Services</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-number">{stats.pendingMessages}</div>
            <div className="stat-label">Pending Messages</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-number">{stats.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Recent Contacts</h2>
          {recentContacts.length > 0 ? (
            <div className="contacts-list">
              {recentContacts.map((contact, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-info">
                    <div className="contact-name">{contact.name}</div>
                    <div className="contact-email">{contact.email}</div>
                    <div className="contact-message">{contact.message}</div>
                  </div>
                  <div className="contact-date">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No recent contacts found.</p>
          )}
        </div>

        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button className="action-btn">
              <span>📧</span>
              View All Contacts
            </button>
            <button className="action-btn">
              <span>🛠️</span>
              Manage Services
            </button>
            <button className="action-btn">
              <span>⚙️</span>
              Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
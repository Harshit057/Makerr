import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminHeader from './components/AdminHeader';
import AdminSidebar from './components/AdminSidebar';
import Dashboard from './pages/Dashboard';
import Contacts from './pages/Contacts';
import Services from './pages/Services';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './AdminApp.css';

function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Check if admin is already logged in
    const token = localStorage.getItem('adminToken');
    if (token) {
      // For demo purposes, assume token is valid
      setAdminData({ username: 'admin', email: 'admin@makerr.com' });
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/admin/me', {
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdminData(data.admin);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('adminToken');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (token, admin) => {
    localStorage.setItem('adminToken', token);
    setAdminData(admin);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setAdminData(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="admin-app">
      <AdminHeader admin={adminData} onLogout={handleLogout} />
      <div className="admin-main">
        <AdminSidebar />
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="services" element={<Services />} />
            <Route path="settings" element={<Settings admin={adminData} />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminApp;

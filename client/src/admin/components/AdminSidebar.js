import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/contacts', label: 'Contacts', icon: '📧' },
    { path: '/admin/services', label: 'Services', icon: '🛠️' },
    { path: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside className="admin-sidebar">
      <nav className="sidebar-nav">
        <ul className="sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.path} className="sidebar-item">
              <Link
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
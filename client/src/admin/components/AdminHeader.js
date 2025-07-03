import React from 'react';
import './AdminHeader.css';

const AdminHeader = ({ admin, onLogout }) => {
  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <h1>Makerr Admin</h1>
      </div>
      
      <div className="admin-header-right">
        <div className="admin-profile">
          <div className="admin-avatar">
            {admin?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="admin-info">
            <span className="admin-name">{admin?.name || 'Admin'}</span>
            <span className="admin-role">Administrator</span>
          </div>
        </div>
        
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
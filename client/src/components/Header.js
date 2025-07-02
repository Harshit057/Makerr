import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="nav-container">
          <Link to="/" className="logo">
            <span className="logo-text">Makerr</span>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <Link to="/contact" className="btn btn-primary">
              Get Quote
            </Link>
            <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
              <span className={`hamburger ${isMenuOpen ? 'hamburger-open' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Cart from './Cart';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const location = useLocation();
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu on outside click and prevent body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    const handleTouchOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && !event.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll when menu is closed
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

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
          
          <nav ref={navRef} className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${isActive('/')}`} onClick={closeMenu}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className={`nav-link ${isActive('/services')}`} onClick={closeMenu}>
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={closeMenu}>
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/careers" className={`nav-link ${isActive('/careers')}`} onClick={closeMenu}>
                  Careers
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={closeMenu}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <button 
              className="cart-icon"
              onClick={toggleCart}
              title="View selected services"
            >
              <i className="fas fa-shopping-cart"></i>
              {cart.count > 0 && (
                <span className="cart-badge">{cart.count}</span>
              )}
            </button>
            
            <Link to="/contact" className="btn btn-primary">
              <span>Get Quote</span>
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
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
};

export default Header;

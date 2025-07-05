import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import QuoteModal from './QuoteModal';
import './Cart.css';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeService, clearCart } = useCart();
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const handleRequestQuote = () => {
    setShowQuoteModal(true);
  };

  const handleQuoteModalClose = () => {
    setShowQuoteModal(false);
    onClose(); // Close cart when quote is submitted
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={onClose}>
        <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cart-header">
            <h3>Selected Services</h3>
            <button className="cart-close" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="cart-content">
            {cart.services.length === 0 ? (
              <div className="cart-empty">
                <i className="fas fa-shopping-cart"></i>
                <p>No services selected yet</p>
                <small>Browse our services and add them to request a quote</small>
              </div>
            ) : (
              <>
                <div className="cart-services">
                  {cart.services.map((service) => (
                    <div key={service.id} className="cart-service-item">
                      <div className="cart-service-info">
                        <div className="cart-service-icon">
                          <i className="material-icons">{service.icon}</i>
                        </div>
                        <div className="cart-service-details">
                          <h4>{service.title}</h4>
                          <p className="cart-service-category">
                            {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                          </p>
                        </div>
                      </div>
                      <button 
                        className="cart-remove-btn"
                        onClick={() => removeService(service.id)}
                        title="Remove service"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-actions">
                  <button 
                    className="btn btn-secondary cart-clear-btn"
                    onClick={clearCart}
                  >
                    Clear All
                  </button>
                  <button 
                    className="btn btn-primary cart-quote-btn"
                    onClick={handleRequestQuote}
                  >
                    Request Quote
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <QuoteModal 
        isOpen={showQuoteModal}
        onClose={handleQuoteModalClose}
        selectedServices={cart.services}
      />
    </>
  );
};

export default Cart;

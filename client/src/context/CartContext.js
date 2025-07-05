import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_SERVICE':
      // Check if service already exists
      const existingServiceIndex = state.services.findIndex(
        service => service.id === action.payload.id
      );
      
      if (existingServiceIndex >= 0) {
        return state; // Service already in cart
      }
      
      return {
        ...state,
        services: [...state.services, action.payload],
        count: state.count + 1
      };
      
    case 'REMOVE_SERVICE':
      return {
        ...state,
        services: state.services.filter(service => service.id !== action.payload),
        count: state.count - 1
      };
      
    case 'CLEAR_CART':
      return {
        ...state,
        services: [],
        count: 0
      };
      
    case 'LOAD_CART':
      return {
        ...state,
        services: action.payload.services || [],
        count: action.payload.count || 0
      };
      
    default:
      return state;
  }
};

const initialState = {
  services: [],
  count: 0
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('makerr-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('makerr-cart', JSON.stringify(state));
  }, [state]);

  const addService = (service) => {
    dispatch({ type: 'ADD_SERVICE', payload: service });
  };

  const removeService = (serviceId) => {
    dispatch({ type: 'REMOVE_SERVICE', payload: serviceId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isServiceInCart = (serviceId) => {
    return state.services.some(service => service.id === serviceId);
  };

  const value = {
    cart: state,
    addService,
    removeService,
    clearCart,
    isServiceInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;

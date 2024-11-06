'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create CartContext
const CartContext = createContext();

// Create CartProvider component to wrap the app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isAdded, setIsAdded] = useState(false); // To track if the product is added to the cart

  // Load cart data from localStorage when the app first loads
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  // Save cart data to localStorage whenever the cart changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  // Compute the total quantity of items in the cart
  const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product, quantity) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000); // Reset the flag after 3 seconds
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, isAdded, totalItemsInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Create custom hook to use cart
export const useCart = () => {
  return useContext(CartContext);
};

import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
  
    if (!product || !product.id) {
      console.error("Intento de agregar producto inválido al carrito:", product);
      return;
    }
  
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    cartItemCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

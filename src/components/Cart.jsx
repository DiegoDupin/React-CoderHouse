import React from 'react';
import { useAppContext } from '../context/AppContext';

const Cart = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useAppContext();

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = typeof item.price === 'number' ? item.price : 0;
    return acc + price * item.quantity;
  }, 0);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h4>{item.title}</h4>
                <p>Precio: ${item.price}</p>
                <p>Cantidad: {item.quantity}</p>
                <button
                  onClick={() => addToCart(item, 1)}
                  style={{ marginRight: '10px', padding: '5px 10px' }}
                >
                  +
                </button>
                <button
                  onClick={() => addToCart(item, -1)}
                  style={{ marginRight: '10px', padding: '5px 10px' }}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
          <div>
            <h3>Total de productos: {totalItems}</h3>
            <h3>Precio total: ${totalPrice.toFixed(2)}</h3>
          </div>
          <button onClick={clearCart} style={{ backgroundColor: 'orange', color: 'white', padding: '10px 20px' }}>
            Vaciar Carrito
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;

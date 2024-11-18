import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import db from '../firebase/db';

const Checkout = () => {
  const { cart, clearCart } = useAppContext();
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const order = {
        items: cart,
        total: totalAmount,
        date: Timestamp.fromDate(new Date()),
      };

      const docRef = await addDoc(collection(db, 'orders'), order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      setError("Hubo un problema al confirmar tu pedido. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Confirmación de Compra</h2>
      {orderId ? (
        <div>
          <p>¡Gracias por tu compra!</p>
          <p>Tu número de orden es: <strong>{orderId}</strong></p>
        </div>
      ) : (
        <div>
          {cart.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <div>
              <h3>Total a pagar: ${totalAmount.toFixed(2)}</h3>
              <button onClick={handleCheckout} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                Confirmar Pedido
              </button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;

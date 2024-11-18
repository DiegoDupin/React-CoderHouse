import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../firebase/db';
import { useAppContext } from '../context/AppContext';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const { addToCart } = useAppContext();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'products', itemId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.error('No existe el producto con el ID:', itemId);
        }
      } catch (error) {
        console.error('Error al obtener el producto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [itemId]);

  const handleAddToCart = () => {
    if (item) {
      addToCart(item, quantity);
    } else {
      console.error('El producto no está disponible para añadir al carrito.');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!item) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Detalle del producto: {item.title}</h2>
      <p>{item.description}</p>
      <p>Precio: ${item.price}</p>
      <img src={item.images[0] || 'https://via.placeholder.com/250'} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <div style={{ margin: '20px 0' }}>
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} style={{ margin: '0 5px' }}>-</button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)} style={{ margin: '0 5px' }}>+</button>
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemDetailContainer;

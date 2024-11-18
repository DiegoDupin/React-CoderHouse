import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const ItemCount = ({ product, stock, initial }) => {
  const [count, setCount] = useState(initial >= 1 && initial <= stock ? initial : 1);
  const { addToCart } = useAppContext();

  useEffect(() => {
  }, [stock, initial]);

  const handleIncrease = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-count" style={{ textAlign: 'center', margin: '20px' }}>
      <div className="item-count-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          onClick={handleDecrease} 
          disabled={count <= 1}
          aria-label="Disminuir cantidad"
          style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ margin: '0 15px', fontSize: '18px' }}>{count}</span>
        <button 
          onClick={handleIncrease} 
          disabled={count >= stock}
          aria-label="Aumentar cantidad"
          style={{ marginLeft: '10px', padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}
        >
          +
        </button>
      </div>
      <button 
        onClick={() => addToCart(product, count)}
        aria-label={`Añadir ${count} productos al carrito`}
        style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemCount;

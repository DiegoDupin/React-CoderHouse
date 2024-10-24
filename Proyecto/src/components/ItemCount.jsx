import { useState, useEffect } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial >= 1 && initial <= stock ? initial : 1);

  useEffect(() => {
    console.log('Valores iniciales -> stock:', stock, ', initial:', initial);
  }, [stock, initial]);

  const handleIncrease = () => {
    console.log('Increase button clicked', count, stock);
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    console.log('Decrease button clicked', count);
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
        onClick={() => {
          console.log(`Añadiendo ${count} productos al carrito`);
          onAdd(count);
        }} 
        aria-label={`Añadir ${count} productos al carrito`}
        style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemCount;

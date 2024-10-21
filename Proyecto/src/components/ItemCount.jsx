import { useState } from 'react';

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrease = () => {
    console.log('Increase button clicked');
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrease = () => {
    console.log('Decrease button clicked');
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button 
          onClick={handleDecrease} 
          style={{ marginRight: '10px', padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}
        >
          -
        </button>
        <span style={{ margin: '0 15px', fontSize: '18px' }}>{count}</span>
        <button 
          onClick={handleIncrease} 
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
        style={{ marginTop: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
      >
        Añadir al carrito
      </button>
    </div>
  );
};

export default ItemCount;

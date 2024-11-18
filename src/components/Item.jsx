import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const Item = ({ item }) => {
  const { addToCart } = useAppContext();

  if (!item || !item.id || !item.title) {
    console.error("El producto no es válido en Item.jsx:", item);
    return null;
  }

  const imageUrl = item.images && item.images.length > 0 && item.images[0] ? item.images[0] : 'https://via.placeholder.com/250';

  return (
    <li style={{ margin: '20px', border: '1px solid #ccc', padding: '20px', width: '250px', boxSizing: 'border-box' }}>
      <h3>{item.title}</h3>
      <p>Precio: ${item.price}</p>
      <p>{item.description}</p>
      <img src={imageUrl} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
      
      <Link
        to={`/item/${item.id}`}
        style={{
          marginTop: '10px',
          display: 'inline-block',
          color: '#007bff',
          textDecoration: 'underline',
        }}
      >
        Ver detalles
      </Link>

      <button
        onClick={() => addToCart(item, 1)}
        style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Agregar al carrito
      </button>
    </li>
  );
};

export default Item;

import { Link } from 'react-router-dom';

const Item = ({ item }) => {
  const imageUrl = item.images && item.images.length > 0 && item.images[0] ? item.images[0] : 'https://via.placeholder.com/250';

  return (
    <li style={{ margin: '20px', border: '1px solid #ccc', padding: '20px', width: '250px', boxSizing: 'border-box' }}>
      <h3>{item.title}</h3>
      <p>Precio: ${item.price}</p>
      <p>{item.description}</p>
      <img src={imageUrl} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <Link to={`/item/${item.id}`} style={{ marginTop: '10px', display: 'inline-block', color: '#007bff' }}>
        Ver detalles
      </Link>
    </li>
  );
};

export default Item;

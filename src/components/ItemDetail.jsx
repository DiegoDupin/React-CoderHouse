import { useAppContext } from '../context/AppContext';
import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
  const { addToCart } = useAppContext();

  const handleAdd = (quantity) => {
    const productWithQuantity = { ...product, quantity };
    addToCart(productWithQuantity);
  };

  const stock = typeof product.stock === 'number' ? product.stock : 0;

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
      <h2>Detalle del producto: {product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <img 
        src={product.images[0] || 'https://via.placeholder.com/300'} 
        alt={product.title} 
        style={{ maxWidth: '300px' }} 
      />
      <br />
      {stock > 0 ? (
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
      ) : (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Producto no disponible</p>
      )}
    </div>
  );
};

export default ItemDetail;

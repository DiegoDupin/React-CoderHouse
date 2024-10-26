import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
  const handleAdd = (quantity) => {
    console.log(`Agregaste ${quantity} productos al carrito`);
  };

  const stock = typeof product.stock === 'number' && product.stock > 0 ? product.stock : 1;

  console.log("Detalles del producto:", product);
  console.log("Stock del producto:", stock);

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
      <h2>Detalle del producto: {product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <img src={product.images[0]} alt={product.title} style={{ maxWidth: '300px' }} />
      <br />
      <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
    </div>
  );
};

export default ItemDetail;

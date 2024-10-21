import ItemCount from './ItemCount';

const ItemDetail = ({ product }) => {
  const handleAdd = (quantity) => {
    console.log(`Agregaste ${quantity} productos al carrito`);
    // Aquí deberías agregar la lógica para actualizar el estado del carrito
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
      <h2>Detalle del producto: {product.title}</h2>
      <p>{product.description}</p>
      <p>Precio: ${product.price}</p>
      <img src={product.images[0]} alt={product.title} style={{ maxWidth: '300px' }} />
      <br />
      <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} /> {/* Pasamos la función handleAdd */}
    </div>
  );
};

export default ItemDetail;

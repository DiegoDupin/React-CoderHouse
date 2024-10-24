import Item from './Item.jsx';

const ItemList = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: '0 auto',
      }}
      aria-label="Lista de productos"
    >
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ItemList;

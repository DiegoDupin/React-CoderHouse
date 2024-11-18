import Item from './Item.jsx';

const ItemList = ({ items }) => {
  if (!items || items.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  const validItems = items.filter((item) => item && item.id && item.title);

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
      {validItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default ItemList;

import Item from './Item.jsx';

const ItemList = ({ items }) => {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
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

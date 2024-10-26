import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const CartWidget = ({ cartCount }) => {
  return (
    <Link 
      to="/carrito" 
      style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }} 
      aria-label="Carrito de compras"
    >
      <ShoppingCartIcon aria-hidden="true" />
      <span 
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '3px 6px',
          fontSize: '12px',
          fontWeight: 'bold',
        }}
        aria-label={`Productos en el carrito: ${cartCount}`}
      >
        {cartCount}
      </span>
    </Link>
  );
};

export default CartWidget;

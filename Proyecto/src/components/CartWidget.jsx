import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const CartWidget = ({ cartCount }) => {
  return (
    <Link to="/carrito" style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }}>
      <ShoppingCartIcon />
      <span 
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '50%',
          padding: '5px',
          fontSize: '12px',
        }}>
        {cartCount}
      </span>
    </Link>
  );
};

export default CartWidget;

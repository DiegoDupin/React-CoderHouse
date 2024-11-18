import { useAppContext } from '../context/AppContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const { cartItemCount } = useAppContext();

  return (
    <Link 
      to="/carrito" 
      style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }} 
      aria-label="Carrito de compras"
    >
      <ShoppingCartIcon aria-hidden="true" />
      {cartItemCount > 0 && (
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
          aria-label={`Productos en el carrito: ${cartItemCount}`}
        >
          {cartItemCount}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;

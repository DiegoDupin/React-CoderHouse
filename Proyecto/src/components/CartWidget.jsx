import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartWidget = () => {
  return (
    <a href="/carrito" style={{ position: 'relative', display: 'inline-block', marginRight: '20px' }}>
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
        3 {/* Número hardcodeado */}
      </span>
    </a>
  );
};

export default CartWidget;

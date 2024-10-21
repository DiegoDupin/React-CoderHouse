import CartWidget from './CartWidget';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta del logo es correcta

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '20px' }} />
        </a>
        <div className="collapse navbar-collapse d-flex justify-content-between">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/negocios">Negocios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/productos">Productos</a>
            </li>
          </ul>
          <div className="ms-auto">
            <CartWidget />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

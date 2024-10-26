import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/categories')
      .then((res) => res.json())
      .then((data) => {
        const limitedCategories = data
          .filter((category) => category.name && category.id)
          .slice(0, 6);
        setCategories(limitedCategories);
      })
      .catch((error) => {
        console.error('Error al obtener categorías:', error);
        setError('Hubo un problema al cargar las categorías.');
      });
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand" to="/">
          <img 
            src={logo} 
            alt="Logo de la tienda" 
            style={{ width: '50px', marginRight: '20px' }} 
          />
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle" 
                href="/" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Categorías
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                {error ? (
                  <li><p className="dropdown-item text-danger">{error}</p></li>
                ) : categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id}>
                      <Link 
                        className="dropdown-item" 
                        to={`/categoria/${category.id}`} 
                        aria-label={`Ver productos de la categoría ${category.name}`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li><p className="dropdown-item">No hay categorías disponibles</p></li>
                )}
              </ul>
            </li>
          </ul>
          <CartWidget cartCount={3} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
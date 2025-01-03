import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CartWidget from './CartWidget';
import logo from '../assets/logo.png';
import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/db';

const NavBar = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesData = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .slice(0, 3);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setError('Hubo un problema al cargar las categorías.');
      }
    };

    fetchCategories();
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
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {error ? (
              <li className="nav-item">
                <p className="nav-link text-danger">{error}</p>
              </li>
            ) : categories.length > 0 ? (
              categories.map((category) => (
                <li className="nav-item" key={category.id}>
                  <Link
                    className="nav-link"
                    to={`/categoria/${category.id}`}
                    aria-label={`Ver productos de la categoría ${category.name}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="nav-item">
                <p className="nav-link">Cargando categorías...</p>
              </li>
            )}
          </ul>
          <CartWidget cartCount={3} />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

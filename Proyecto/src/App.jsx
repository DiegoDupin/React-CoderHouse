import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/productos" element={<ItemListContainer />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
        <Route path="/categoria/:categoryId" element={<ItemListContainer />} />
        <Route 
          path="*" 
          element={
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>Página no encontrada</h1>
              <p>Lo sentimos, la página que buscas no existe.</p>
              <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>Volver al inicio</Link>
            </div>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

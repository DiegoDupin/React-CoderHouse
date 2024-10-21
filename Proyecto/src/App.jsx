import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        
        {/* Ruta para las categorías */}
        <Route path="/categoria/:categoryId" element={<ItemListContainer />} />

        {/* Ruta para manejar errores 404 */}
        <Route path="*" element={
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Página no encontrada</h1>
            <p>Lo sentimos, la página que buscas no existe.</p>
            <a href="/" style={{ color: '#007bff' }}>Volver al inicio</a>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;

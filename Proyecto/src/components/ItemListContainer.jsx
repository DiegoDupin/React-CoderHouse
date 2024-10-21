import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';

const ItemListContainer = () => {
  const { categoryId } = useParams(); // Capturamos el parámetro de la URL
  const [items, setItems] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // IDs de las categorías permitidas (verificar que coincidan con los IDs reales de la API)
  const allowedCategories = [1, 2, 3, 4, 5, 6]; 

  useEffect(() => {
    let url = 'https://api.escuelajs.co/api/v1/products';

    // Si hay una categoría, usamos el endpoint de categorías de la API
    if (categoryId) {
      url = `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta de la API');
        }
        return res.json();
      })
      .then((data) => {
        let filteredProducts = data;

        // Filtramos productos si no estamos en una categoría específica
        if (!categoryId) {
          filteredProducts = data.filter(
            product => allowedCategories.includes(product.category.id) // Filtramos por categoría permitida
          );
        }

        // Filtramos productos que tengan datos completos y válidos
        filteredProducts = filteredProducts.filter(product => 
          product.title && product.title !== "New Product" && 
          product.description && product.price && 
          product.images && product.images.length > 0 && 
          product.images[0].startsWith('http') && 
          !product.images[0].includes('placeholder')
        );

        setItems(filteredProducts); // Guardamos los productos filtrados en el estado
        setLoading(false); // Finalizamos la carga
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Hubo un problema al cargar los productos.');
        setLoading(false);
      });
  }, [categoryId]); // Recalculamos cuando cambie la categoría

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
      <h2>Productos {categoryId ? `de la categoría: ${categoryId}` : ''}</h2>
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p>No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import Loader from './Loader';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const allowedCategories = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    let url = 'https://api.escuelajs.co/api/v1/products';

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
        let filteredProducts = categoryId ? data : data.filter(
          product => allowedCategories.includes(product.category.id)
        );

        filteredProducts = filteredProducts.filter(product =>
          product.title &&
          product.title !== "New Product" &&
          product.description &&
          product.price &&
          product.images &&
          product.images.length > 0 &&
          product.images[0].startsWith('http') &&
          !product.images[0].includes('placeholder')
        );

        setItems(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError('Hubo un problema al cargar los productos.');
        setLoading(false);
      });
  }, [categoryId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p aria-live="assertive" role="alert" style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px' }}>
      <h2>Productos {categoryId ? `de la categoría: ${categoryId}` : ''}</h2>
      {items.length > 0 ? (
        <ItemList items={items} />
      ) : (
        <p aria-live="assertive" role="alert">No hay productos disponibles en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import Loader from './Loader';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.escuelajs.co/api/v1/products/${itemId}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then((data) => {
        const updatedProduct = { ...data, stock: 10 };
        setProductDetails(updatedProduct);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError('Hubo un problema al cargar el producto. Inténtalo de nuevo más tarde.');
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p aria-live="assertive" role="alert" style={{ color: 'red' }}>{error}</p>;
  }

  if (!productDetails) {
    return <p aria-live="assertive" role="alert" style={{ color: 'red' }}>Producto no encontrado.</p>;
  }

  return <ItemDetail product={productDetails} />;
};

export default ItemDetailContainer;

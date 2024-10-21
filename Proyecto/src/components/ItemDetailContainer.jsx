import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // Capturamos el parámetro de la URL
  const [productDetails, setProductDetails] = useState(null); // Estado para almacenar el detalle del producto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  // Hacemos el llamado a la API cuando el componente se monta
  useEffect(() => {
    const url = `https://api.escuelajs.co/api/v1/products/${itemId}`; // URL para obtener el detalle del producto

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return res.json();
      })
      .then((data) => {
        setProductDetails(data); // Guardamos los detalles del producto
        setLoading(false); // Indicamos que la carga terminó
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setError('Hubo un problema al cargar el producto. Inténtalo de nuevo más tarde.');
        setLoading(false);
      });
  }, [itemId]);

  if (loading) {
    return <p>Cargando detalles del producto...</p>; // Mostramos un mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mostramos el mensaje de error si ocurre
  }

  if (!productDetails) {
    return <p>Producto no encontrado.</p>; // Si no se encuentra el producto, mostramos un mensaje de error
  }

  return <ItemDetail product={productDetails} />; // Delegamos la presentación a ItemDetail
};

export default ItemDetailContainer;

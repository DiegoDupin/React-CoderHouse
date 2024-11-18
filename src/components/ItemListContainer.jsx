import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebase/db';
import ItemList from './ItemList';
import Loader from './Loader';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let q = collection(db, 'products');
  
        if (categoryId) {
          q = query(q, where('category', '==', categoryId));
        }
  
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          price: typeof doc.data().price === 'number' ? doc.data().price : 0,
        }));
  
        setItems(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Hubo un problema al cargar los productos.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
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

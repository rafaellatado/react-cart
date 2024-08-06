import React, { useEffect, useContext } from 'react';

import './Products.css';
import fetchProducts from '../../api/fetchProducts';
import ProductCard from '../ProductCard/ProductCard';
import Loading from '../Loading/Loading';
import AppContext from '../../context/AppContext';

function Products() {

  const { products, setProducts, loading, setLoading } = useContext(AppContext);
  

  /* Usamos "useEffect" quando queremos realizar side effects when the component mounts, updates or unmounts.
  useEffect side effects are: fetching data, updating documents, setting and cleaning events, and performing cleanup. 
  The second argument "[]" epresents the dependency array. 
  1- If the dependency array is empty ([]), the effect will run only once when the component mounts.
  2- If you omit the dependency array entirely (i.e., you don't provide a second argument), 
  the effect will run on every re-render of the component.
  3- If you provide variables inside the dependency array, for example, [someVariable], 
  the effect will run whenever the value of someVariable changes. 
  If you provide multiple variables, the effect will run whenever any of those variables change.*/
  useEffect(() => {
    fetchProducts('iphone').then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  /* O código acima também pode ser escrito usando 'async' e 'await' ao invés de 'then', dessa forma:

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProducts('iphone');
        setProducts(response);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
  
    fetchData();
  }, []);

  */

  return (
    (loading && <Loading /> ) || (
      <section className="products container">
        {products.map((product) => <ProductCard key={product.id} data={product} />)}
      </section>
    )

    /* 'products' is a state containing an array of products. The 'map' function iterates over each and every element
    of the 'products' array. 'product' represents each product and is not a reserved word, meaning we could choose to
    use any word here. 'key' is a reserved word, or a special attribute used in React to help React identify which items 
    have changed, are added, or are removed. It's required when rendering a list of elements to ensure each item has 
    a unique identifier. 'id' is not a reserved word, meaning we could choose any other valid variable name here.
    'data={product}' means we're passing props to the 'ProductCard' component. */
    
  );
}

export default Products;

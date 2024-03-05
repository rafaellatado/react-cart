import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsFillCartPlusFill } from 'react-icons/bs';

import './ProductCard.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';

function ProductCard({ data }) {
  const { title, thumbnail, price } = data;

  const { cartItems, setCartItems } = useContext(AppContext);

  const handleAddCart = () => setCartItems([ ...cartItems, data ]);

  /* The spread operator "..." spreads the elements of the cartItems array into a new array. This is important because 
  directly mutating the state could lead to unexpected behavior in React due to its reliance on immutable data principles. 
  By creating a new array with the spread syntax, we ensure that we are not mutating the original state directly.
  The "data" part adds the data object to the end of the new array. Essentially, it appends the data object to the copy 
  of the cartItems array.
  In each iteration, the spread operator ensures that we create a new array with the existing items in cartItems, 
  and then we append the new data object to it. 
  
  Also, in React, when you call a state update function like setCartItems, React doesn't immediately update the state. 
  Instead, it schedules the state update and re-renders the component with the updated state at the end of the current 
  execution context. It's only when the function completes execution and React reconciles the changes that the state is 
  actually updated, and the component is re-rendered with the new state.*/

  return (
    <section className="product-card">
      
      <img
        src={thumbnail.replace(/\w\.jpg/gi, 'W.jpg')}
        /* "thumbnail" is a property of the Mercado Livre API, and above we are replacing the picture for a 
        better quality picture based on the API's specific syntax rules */
        alt="product"
        className="card__image"
      />

      <div className="card__infos">
        <h2 className="card__price">{formatCurrency(price, 'BRL')}</h2>
        <h2 className="card__title">{title}</h2>
      </div>

      <button
        type="button"
        className="button__add-cart"
        onClick={ handleAddCart }
      >
        <BsFillCartPlusFill />
      </button>
    </section>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  data: propTypes.shape({}),
}.isRequired;

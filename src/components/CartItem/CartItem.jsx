import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { BsCartDashFill } from 'react-icons/bs';

import './CartItem.css';
import formatCurrency from '../../utils/formatCurrency';
import AppContext from '../../context/AppContext';

function CartItem({ data }) {

  const { cartItems, setCartItems } = useContext(AppContext);
  const { id, thumbnail, title, price } = data;
  /* The line above is saying that I'll be able to access the d, thumbnail, title, price properties of 'data'
  without having to use data.thumbnail, for example. Only 'thumbnail' will already work. */

  const handleRemoveItem = () => {
    const updatedItems = cartItems.filter((item) => item.id != id);
    setCartItems(updatedItems);
  };
  /* The filter() method creates a new array containing elements for which the provided filtering function returns true. 
  Therefore, items that return true for the condition item.id !== id are kept in the filtered array, 
  while items that return false are removed. */

  return (
    <section className="cart-item">
      <img
        src={thumbnail}
        alt="imagem do produto"
        className="cart-item-image"
      />

      <div className="cart-item-content">
        <h3 className="cart-item-title">{title}</h3>
        <h3 className="cart-item-price">{formatCurrency(price, 'BRL')}</h3>

        <button
          type="button"
          className="button__remove-item"
          onClick={ handleRemoveItem }
        >
          <BsCartDashFill />
        </button>
      </div>
    </section>
  );
}

export default CartItem;

CartItem.propTypes = {
  data: propTypes.object
}.isRequired;

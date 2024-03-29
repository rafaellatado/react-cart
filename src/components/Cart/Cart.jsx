import React, { useContext } from 'react';

import './Cart.css';
import CartItem from '../CartItem/CartItem';
import AppContext from '../../context/AppContext';
import formatCurrency from '../../utils/formatCurrency';

function Cart() {
  const { cartItems, isCartVisible } = useContext(AppContext);

  const totalPrice = cartItems.reduce((acc, item) => item.price + acc, 0);
  /* In here we're using the reduce method to calculate the totalPrice in the cartItems' array.
  The reduce method takes a callback function as its first argument and an initial value 
  as a second argument (in this case, 0). The callback's first parameter 
  (commonly named acc, short for "accumulator", but not a reserved word) always represents the accumulated value computed so far 
  during the reduction process. It starts with the initial value provided to reduce() (which is 0 in this case) and is 
  updated with each iteration of the method.
  The second parameter (commonly named item, but also not a reserved word) represents the current element 
  being processed in the array during each iteration of the reduce() method. 
  It changes with each iteration, cycling through each element of the array.*/

  return (
    /* In the line below we use a template literal to create a dynamic class. Here's how it works:
    We use template literals to transform expressions and functions into strings, and we do that by
    starting with the dollar sign "$". Then we use a ternary conditional that says: When 'isCartVisible' is truthy
    we'll add 'cart--active' to the clasName, resulting in 'cart cart--active'. When 'isCartVisible' is false,
    we'll ad an empty string, meaning the className won't change. It will keep being 'cart'. */
    <section className={`cart ${isCartVisible ? 'cart--active' : ''}`}>
      <div className="cart-items">
        { cartItems.map((cartItem) => <CartItem key={cartItem.id} data={cartItem} />) }
      </div>

      <div className="cart-resume">{formatCurrency(totalPrice, 'BRL')}</div>
    </section>
  );
}

export default Cart;

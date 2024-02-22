import React, { useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';

import './SearchBar.css';
import fetchProducts from '../../api/fetchProducts';
import AppContext from '../../context/AppContext';

function SearchBar() {

  const { setProducts, setLoading } = useContext(AppContext);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (event) => {
    //alert pra testar te a função estava funcionando quando eu envio o formulário
    //alert('teste');

    event.preventDefault();
    setLoading(true);
    const products = await fetchProducts(searchValue);
    //console pra checar no console do browser se a variável 'const' está funcionando
    //console.log(products);

    setProducts(products);
    setLoading(false);
    setSearchValue('');
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      {name}
      <input 
        type="search" 
        placeholder="Buscar produtos" 
        className="search__input"

        // Escrevemos a linha abaixo para garantir que quem está controlando
        // o valor do input não é mais o html e sim o React (O searchValue, no caso)
        value={searchValue}

        // Aqui embaixo utilizamos a função setSearchValue dentro do nosso input 
        // para pegarmos o valor digitado no input e atualizar o estado searchValue
        onChange={ ({ target }) => setSearchValue(target.value) } 
        required
      />
      {/* Uma boa forma de testar nosso estado (searchValue) é adicionar ele em algum lugar do código, 
      tal como foi feito abaixo, e ver se o estado está de fato funcionando. No exemplo comentado abaixo, quando
      digitamos no nosso input, vemos o programa reproduzir o que estamos digitando em outra parte da tela */}
      {/* { searchValue } */}
      <button type="submit" className="search__button">
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;

/* EXPLANATION

The use of an asynchronous function and the await keyword in the handleSearch function is related to 
the asynchronous nature of certain operations, such as fetching data from an API.
The fetchProducts function is likely an asynchronous function responsible for fetching data from 
an external source, such as an API. As network requests are inherently asynchronous 
(they take time to complete), using an asynchronous function ensures that the application doesn't get 
blocked while waiting for the data to be fetched.
The await keyword is used inside an asynchronous function to wait for a Promise to resolve before 
proceeding to the next line of code.


Here's a simplified explanation of how the asynchronous flow works:

- The handleSearch function is triggered when the form is submitted.

- The event.preventDefault() prevents the default form submission behavior in HTML, 
which is to send the form data to the URL specified in the form's action attribute using an HTTP request.
If a <form> element doesn't have an explicitly specified action attribute, the default behavior is 
to submit the form to the current URL (i.e., the URL of the page containing the form). 
This behavior is often referred to as a "same-page" or "self" submission. 
Preventing the default behavior allows you to handle the click event using custom logic.

- setLoading(true) is called to indicate that data fetching is in progress.

- The await fetchProducts(searchValue) line pauses execution until the data is fetched.

- Once the data is fetched, it is assigned to the products variable.

- setProducts(products) is called to update the shared state with the fetched data.

- setLoading(false) is called to indicate that the data fetching is complete.

- setSearchValue('') resets the search input to an empty string.

This asynchronous approach ensures that the user interface remains responsive during the data-fetching 
operation. Without await, the subsequent lines of code could potentially execute before the data is 
fetched, leading to unexpected behavior.
*/

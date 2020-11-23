import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  getMealByFirstLetter,
  getMealByName,
  getMealAPIByIngredient,
  getDrinkAPIByFirstLetter,
  getDrinkAPIByName,
  getDrinkAPIByIngredient,
} from '../services';

function Home({ title }) {
  const [isSearching, setSearch] = useState(false);
  const {
    ingredient,
    setIngredient,
    firstLetter,
    setFirstLetter,
    name,
    setName,
    searchTerm,
  } = useContext(RecipesAppContext);

  function verification({ target: { id } }) {
    if (id === 'ingredient-search-radio') {
      setIngredient(true);
      setFirstLetter(false);
      setName(false);
    } else if (id === 'first-letter-search-radio') {
      setIngredient(false);
      setFirstLetter(true);
      setName(false);
    } else if (id === 'name-search-radio') {
      setIngredient(false);
      setFirstLetter(false);
      setName(true);
    }
  }

  const requisitionToAPI = async (byIngridient, byFirstLetter, byName) => {
    if (ingredient) {
      console.log('requisição para API de ingredientes');
      const response = await byIngridient(searchTerm);
      console.log(response);
    } else if (firstLetter) {
      console.log('requisição para API de primeira letra');
      if (searchTerm.length !== 1) {
        console.log('uma letra', searchTerm.length);
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        console.log('duas letras', searchTerm.length);
        const response = await byFirstLetter(searchTerm);
        console.log(response);
      }
    } else if (name) {
      console.log('requisição para API de nomes');
      const response = await byName(searchTerm);
      console.log(response);
    } else {
      window.alert('Escolha uma opção dentre ingredientes, Primeira letra ou Nome');
    }
  };

  const requisition = () => {
    if (title === 'Comidas') {
      requisitionToAPI(getMealAPIByIngredient,
        getMealByFirstLetter,
        getMealByName);
      console.log('Entrou em comidas', title);
    } else {
      requisitionToAPI(getDrinkAPIByIngredient,
        getDrinkAPIByFirstLetter,
        getDrinkAPIByName);
      console.log('Entrou em bebidas', title);
    }
  };

  return (
    <div>
      <Header
        setSearch={ setSearch }
        isSearching={ isSearching }
        title={ title }
      />
      {
        isSearching &&
        <SearchBar
          verification={ verification }
          onClick={ requisition }
        />
      }
    </div>
  );
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Home;

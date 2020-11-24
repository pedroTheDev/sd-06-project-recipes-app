import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RevenueContext from '../context/RevenueContext';

export default function SearchBar(props) {
  const { fetchApi, searchParam, setSearchParam } = useContext(RevenueContext);
  const { title } = props;
  const [searchInputValue, setsearchInputValue] = useState();
  const [searchRadioValue, setsearchRadioValue] = useState();
  const [URLToFetch, setURLToFetch] = useState();

  useEffect(() => {
    if (!URLToFetch && searchParam === 'Meal') fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    if (!URLToFetch && searchParam === 'Drink') fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    if (URLToFetch) fetchApi(URLToFetch);
  }, [URLToFetch]);

  const URLs = {
    foodFirstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInputValue}`,
    foodIngredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputValue}`,
    foodName: `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputValue}`,
    drinkFirstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInputValue}`,
    drinkIngredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInputValue}`,
    drinkName: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInputValue}`,
  };

  const handleChangeInputValue = ({ target: { value } }) => {
    setsearchInputValue(value);
  };
  const handleRadioValue = ({ target: { value } }) => {
    setsearchRadioValue(value);
  };
  const searchURL = () => {
    if (searchInputValue
      && searchRadioValue === 'first-letter'
      && searchInputValue.length !== 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      if (title === 'Comidas') {
        setSearchParam('Meal');
        if (searchRadioValue === 'first-letter') {
          setURLToFetch(URLs.foodFirstLetter);
        }
        if (searchRadioValue === 'ingredient') {
          setURLToFetch(URLs.foodIngredient);
        }
        if (searchRadioValue === 'name') {
          setURLToFetch(URLs.foodName);
        }
      }
      if (title === 'Bebidas') {
        setSearchParam('Drink');
        if (searchRadioValue === 'first-letter') {
          setURLToFetch(URLs.drinkFirstLetter);
        }
        if (searchRadioValue === 'ingredient') {
          setURLToFetch(URLs.drinkIngredient);
        }
        if (searchRadioValue === 'name') {
          setURLToFetch(URLs.drinkName);
        }
      }
    }
  };

  return (
    <form>
      <label htmlFor="search-input">
        <input
          data-testid="search-input"
          type="text"
          id="search-input"
          name="searh-input"
          placeholder="Buscar Receita"
          onChange={ (e) => handleChangeInputValue(e) }
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            value="ingredient"
            name="radio-selection"
            onChange={ (e) => handleRadioValue(e) }
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            value="name"
            name="radio-selection"
            onChange={ (e) => handleRadioValue(e) }
          />
          Nome
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            value="first-letter"
            name="radio-selection"
            onChange={ (e) => handleRadioValue(e) }
          />
          Primeira Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => (
            (searchInputValue && searchRadioValue)
              ? searchURL()
              : alert('Preencha campo de busca e selecione ao menos uma opção')
          ) }
        >
          Buscar

        </button>
      </div>
    </form>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

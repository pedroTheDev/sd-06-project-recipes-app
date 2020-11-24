import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const [foodResult, setFoodResult] = useState([]);
  const [drinksResult, setDrinksResult] = useState([]);
  const [test, setTest] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;
  const {
    showSearchBar,
    setSearchBar,
    getFilteredRecipesApi,
    getFilteredDrinksApi,
  } = useContext(MealsContext);
  const showOrHideSearchBar = () => {
    if (showSearchBar) {
      setSearchBar(false);
    } else {
      setSearchBar(true);
    }
  };

  const handleChange = ({ target }) => {
    setInputValue(target.value);
  };

  const handleRadio = ({ target }) => {
    const { value } = target;
    switch (value) {
      case 'ingredients':
        return setRadioValue(value);
      case 'name':
        return setRadioValue(value);
      case 'first':
        return setRadioValue(value);
      default:
        return '';
    }
  };

  const shouldRedirect = (value) => {
    console.log('redirect', value);
    if (value !== null && value.length === 1) {
      console.log('if');
      setRedirect(true);
    } else if (value === null) {
      console.log('else');
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else {
      setTest(true);
    }
  };

  const handleButton = async () => {
    if (inputValue.length !== 1 && radioValue === 'first') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas') {
      const recipes = await getFilteredRecipesApi(radioValue, inputValue);
      setFoodResult(recipes);
      shouldRedirect(recipes);
    } else if (pathname === '/bebidas') {
      const drinks = await getFilteredDrinksApi(radioValue, inputValue);
      setDrinksResult(drinks);
      shouldRedirect(drinks);
    }
  };

  const renderFoodCard = () => {
    if (redirect && pathname === '/comidas') {
      return <Redirect to={`/comidas/${foodResult[0].idMeal}`} />;
    }
    return test && foodResult.slice(0, 12).map((recipe, i) => (
      <div data-testid={`${i}-recipe-card`} key={recipe.strMeal}>
        <p data-testid={`${i}-card-name`}>{recipe.strMeal}</p>
        <img data-testid={`${i}-card-img`} alt="food recipe" src={recipe.strMealThumb} width="100px" />
      </div>
    ));
  };

  const renderDrinksCard = () => {
    if (redirect && pathname === '/bebidas') {
      return <Redirect to={`/bebidas/${drinksResult[0].idDrink}`} />;
    }
    return test && drinksResult.slice(0, 12).map((recipe, i) => (
      <div data-testid={`${i}-recipe-card`} key={recipe.strDrink}>
        <p data-testid={`${i}-card-name`}>{recipe.strDrink}</p>
        <img data-testid={`${i}-card-img`} alt="drink recipe" src={recipe.strDrinkThumb} width="100px" />
      </div>
    ));
  };

  return (
    <div>
      <img src={searchIcon} alt="Search" data-testid="search-top-btn" onClick={showOrHideSearchBar} aria-hidden="true" />
      {showSearchBar ? <input type="text" data-testid="search-input" id="search-input" name="search" onChange={handleChange} /> : null}
      <div>
        <label>
          <input type="radio" value="ingredients" name="filter" data-testid="ingredient-search-radio" onChange={handleRadio} />
          Ingredients
        </label>
        <label>
          <input type="radio" value="name" name="filter" data-testid="name-search-radio" onChange={handleRadio} />
          Nome
        </label>
        <label>
          <input type="radio" value="first" name="filter" data-testid="first-letter-search-radio" onChange={handleRadio} />
          Primeira letra
        </label>
      </div>
      <button type="button" data-testid="exec-search-btn" onClick={handleButton}>Buscar</button>
      {renderFoodCard()}
      {renderDrinksCard()}
    </div>
  );
}

export default SearchBar;

import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import MealsContext from '../context/MealsContext';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  // const [foodResult, setFoodResult] = useState([]);
  // const [drinksResult, setDrinksResult] = useState([]);
  // const [test, setTest] = useState(false);
  // const [redirect, setRedirect] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const history = useHistory();
  const { location: { pathname } } = history;
  // const ZERO = 0;
  // const DOZE = 12;
  const {
    showSearchBar,
    setSearchBar,
    getFilteredRecipesApi,
    getFilteredDrinksApi,
    setCardsRecipe,
  } = useContext(MealsContext);

  useEffect(() => {
    switch (pathname) {
    case '/explorar':
      return setShowIcon(false);
    case '/explorar/comidas':
      return setShowIcon(false);
    case '/explorar/comidas/ingredientes':
      return setShowIcon(false);
    case '/explorar/bebidas':
      return setShowIcon(false);
    case '/explorar/bebidas/ingredientes':
      return setShowIcon(false);
    case '/receitas-feitas':
      return setShowIcon(false);
    case '/receitas-favoritas':
      return setShowIcon(false);
    case '/perfil':
      return setShowIcon(false);
    default:
      return setShowIcon(true);
    }
  }, []);

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

  // const shouldRedirect = (value) => {
  //   if (value !== null && value.length === 1) {
  //     setRedirect(true);
  //   } else if (value === null) {
  //     alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  //   } else {
  //     setTest(true);
  //   }
  // };

  const handleButton = async () => {
    if (inputValue.length !== 1 && radioValue === 'first') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else if (pathname === '/comidas') {
      const recipes = await getFilteredRecipesApi(radioValue, inputValue);
      if (recipes === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else if (recipes.length === 1) {
        console.log(recipes[0].idMeal);
        return (<Redirect to={ `/comidas/${recipes[0].idMeal}` } />);
      } else {
        const myCards = recipes.map((item) => {
          const cardsMeal = {
            id: item.idMeal, strName: item.strMeal, strThumb: item.strMealThumb,
          };
          return cardsMeal; // retorna o novo objeto criado no map do myCards
        });
        setCardsRecipe(myCards);
      }
    } else if (pathname === '/bebidas') {
      const drinks = await getFilteredDrinksApi(radioValue, inputValue);
      if (drinks === null) {
        alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      } else {
        const myCards = drinks.map((item) => {
          const cardsDrinks = {
            id: item.idDrink, strName: item.strDrink, strThumb: item.strDrinkThumb,
          };
          return cardsDrinks; // retorna o novo objeto criado no map do myCards
        });
        setCardsRecipe(myCards);
      }
    }
  };

  // const renderFoodCard = () => {
  //   if (redirect && pathname === '/comidas') {
  //     return <Redirect to={ `/comidas/${foodResult[0].idMeal}` } />;
  //   }
  //   return test && foodResult.slice(ZERO, DOZE).map((recipe, i) => (
  //     <div data-testid={ `${i}-recipe-card` } key={ recipe.strMeal }>
  //       <p data-testid={ `${i}-card-name` }>{recipe.strMeal}</p>
  //       <img
  //         data-testid={ `${i}-card-img` }
  //         alt="food recipe"
  //         src={ recipe.strMealThumb }
  //         width="100px"
  //       />
  //     </div>
  //   ));
  // };

  // const renderDrinksCard = () => {
  //   if (redirect && pathname === '/bebidas') {
  //     return <Redirect to={ `/bebidas/${drinksResult[0].idDrink}` } />;
  //   }
  //   return test && drinksResult.slice(ZERO, DOZE).map((recipe, i) => (
  //     <div data-testid={ `${i}-recipe-card` } key={ recipe.strDrink }>
  //       <p data-testid={ `${i}-card-name` }>{recipe.strDrink}</p>
  //       <img
  //         data-testid={ `${i}-card-img` }
  //         alt="drink recipe"
  //         src={ recipe.strDrinkThumb }
  //         width="100px"
  //       />
  //     </div>
  //   ));
  // };

  return (
    <div>
      {showIcon ? <img
        src={ searchIcon }
        alt="Search"
        data-testid="search-top-btn"
        onClick={ showOrHideSearchBar }
        aria-hidden="true"
      /> : null}
      {showSearchBar
        ? (
          <input
            type="text"
            data-testid="search-input"
            id="search-input"
            name="search"
            onChange={ handleChange }
          />)
        : null}
      <div>
        <label htmlFor="filter">
          <input
            type="radio"
            value="ingredients"
            name="filter"
            data-testid="ingredient-search-radio"
            onChange={ handleRadio }
          />
          Ingredients
        </label>
        <label htmlFor="filter">
          <input
            type="radio"
            value="name"
            name="filter"
            data-testid="name-search-radio"
            onChange={ handleRadio }
          />
          Nome
        </label>
        <label htmlFor="filter">
          <input
            type="radio"
            value="first"
            name="filter"
            data-testid="first-letter-search-radio"
            onChange={ handleRadio }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Buscar
      </button>
      {/* {renderFoodCard()} */}
      {/* {renderDrinksCard()} */}
    </div>
  );
}

export default SearchBar;

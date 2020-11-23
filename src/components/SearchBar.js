import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
import Card from './Card';

function SearchBar(props) {
  const [renderRecipes, setRenderRecipes] = useState(false);
  const { fetchApi } = props;
  const {
    setSelectedRadio, setSearchText, setIdRecipe, setRecipes, setTypeRecipe,
  } = useContext(ContextRecipes);

  const location = useLocation().pathname;

  const history = useHistory();

  const renderCards = (recipeApi) => {
    if (!recipeApi) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipeApi.length === 1) {
      if (location === '/comidas') {
        setIdRecipe(recipeApi[0].idMeal);
        history.push(`/comidas/${recipeApi[0].idMeal}`);
      } else {
        setIdRecipe(recipeApi[0].idDrink);
        history.push(`/bebidas/${recipeApi[0].idDrink}`);
      }
    } else {
      setRenderRecipes(true);
    }
  };

  useEffect(() => {
    if (location === '/comidas') {
      setTypeRecipe('food');
    } else {
      setTypeRecipe('drink');
    }
  }, []);

  const handleClick = async () => {
    const selectedRadio = document.querySelector('input[name="search"]:checked').value;
    const inputSearch = document.querySelector('#search-input').value;
    const recipesApi = await fetchApi(selectedRadio, inputSearch);
    setSearchText(inputSearch);
    setSelectedRadio(selectedRadio);
    setRecipes(recipesApi);
    renderCards(recipesApi);
  };

  return (
    <div>
      {renderRecipes ? <Card /> : null}
      <input type="text" data-testid="search-input" id="search-input" />
      <label htmlFor="ingredient">
        Ingrediente
        <input
          type="radio"
          value="ingredient"
          name="search"
          data-testid="ingredient-search-radio"
          id="ingredient"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          value="name"
          name="search"
          data-testid="name-search-radio"
          id="name"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          value="first-letter"
          name="search"
          data-testid="first-letter-search-radio"
          id="first-letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  fetchApi: PropTypes.func.isRequired,
};

export default SearchBar;

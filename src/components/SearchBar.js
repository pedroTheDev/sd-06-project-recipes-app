import React, { useContext, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextRecipes from '../context/ContextRecipes';
// import fetchAPIRecipes from '../services';

function SearchBar(props) {
  const [renderRecipes, setRenderRecipes] = useState(false);
  const { fetchApi } = props;
  const {
    setSelectedRadio, setSearchText, setIdRecipe, recipes, setRecipes,
  } = useContext(ContextRecipes);

  const location = useLocation().pathname;
  const history = useHistory();

  const renderCards = (recipeApi) => {
    if (!recipeApi) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (recipeApi.length === 1) {
      if (location === '/comidas') {
        const idRecipe = recipeApi[0].idMeal;
        setIdRecipe(idRecipe);
        history.push(`/comidas/${idRecipe}`);
      } else {
        const idRecipe = recipeApi[0].idDrink;
        setIdRecipe(idRecipe);
        history.push(`/bebidas/${idRecipe}`);
      }
    } else {
      setRenderRecipes(true);
    }
  };

  const handleClick = async () => {
    const selectedRadio = document.querySelector('input[name="search"]:checked').value;
    const inputSearch = document.querySelector('#search-input').value;
    const recipesApi = await fetchApi(selectedRadio, inputSearch);
    setSearchText(inputSearch);
    setSelectedRadio(selectedRadio);
    setRecipes(recipesApi);
    renderCards(recipesApi);
    console.log('receitas:', recipesApi);
  };

  return (
    <div>
      {renderRecipes ? recipes.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt="meal"
          />
        </div>
      )) : null}
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

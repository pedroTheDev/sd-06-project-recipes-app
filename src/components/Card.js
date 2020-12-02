import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import '../App.css';

function Card() {
  const { recipes, typeRecipe, setIdRecipe } = useContext(ContextRecipes);
  const history = useHistory();
  const location = useLocation().pathname;
  const MAX_NUMBER_OF_CARDS = 12;
  let name = '';
  let thumb = '';
  let id = '';
  let path = '';

  if (location.includes('comidas')) {
    name = 'strMeal';
    thumb = 'strMealThumb';
    id = 'idMeal';
    path = 'comidas';
  } else {
    name = 'strDrink';
    thumb = 'strDrinkThumb';
    id = 'idDrink';
    path = 'bebidas';
  }

  const goToDetails = ({ target }) => {
    const idRecipe = target.id;
    setIdRecipe(idRecipe);
    history.push(`/${path}/${idRecipe}`);
  };

  return (
    recipes.map((recipe, index) => (
      <div
        onClick={ goToDetails }
        id={ recipe[id] }
        onKeyPress={ goToDetails }
        role="button"
        tabIndex="0"
        data-testid={ `${index}-recipe-card` }
        key={ index }
        className="card"
      >
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
          id={ recipe[id] }
        >
          {recipe[name]}
        </h5>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[thumb] }
          alt={ typeRecipe }
          id={ recipe[id] }
          aria-hidden="true"
          className="card-img"
        />
      </div>
    )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
  );
}

export default Card;

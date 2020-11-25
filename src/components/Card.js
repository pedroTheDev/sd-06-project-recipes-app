import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';

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
        // style={ { border: 'solid 3px black' } }
      >
        <p data-testid={ `${index}-card-name` }>{recipe[name]}</p>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe[thumb] }
          alt={ typeRecipe }
          // onClick={ goToDetails }
          // id={ recipe[id] }
          aria-hidden="true"
          width="100px"
        />
      </div>
    )).filter((_, index) => index < MAX_NUMBER_OF_CARDS)
  );
}

export default Card;

import React, { useContext } from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

function Cards({ info, recipe, index }) {
  const { strIngredient } = info;
  const { strIngredient1 } = info;
  const { recipesToRenderByIngredient } = useContext(Context);
  const url = 'https://www.themealdb.com/images/ingredients/';
  const type = recipe === 'ingredientsMeals' ? 'meal' : 'drink';
  const imageMeal = `${strIngredient}.png`;
  const imageDrink = `${strIngredient1}.png`;

  return (
    <Link
      to={
        recipe === 'ingredientsMeals'
          ? ('/comidas', recipesToRenderByIngredient(type, strIngredient))
          : '/bebidas'
      }
    >
      <div
        className="recipe-card"
        data-testid={ `${index}-ingredient-card` }
      >
        <img
          src={ `${url}${recipe === 'ingredientsMeals' ? imageMeal : imageDrink}` }
          className="thumbnail"
          alt={ recipe === 'ingredientsMeals' ? strIngredient : strIngredient1 }
          data-testid={ `${index}-card-img` }
        />
        <p
          className="recipe-card-name"
          data-testid={ `${index}-card-name` }
        >
          { recipe === 'ingredientsMeals' ? strIngredient : strIngredient1 }
        </p>
      </div>
    </Link>
  );
}

Cards.propTypes = {
  info: PropTypes.objectOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
  recipe: PropTypes.string.isRequired,
};

export default Cards;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/Context';

import '../css/Cards.css';

export default function IngredientCards({ id }) {
  const { items } = useContext(RecipesContext);

  if (items) {
    if (items.drinks) {
      return (
        <div className="cards-wrapper">
          {items.drinks.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idDrink}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  src={ `https://www.thecocktaildb.com/images/ingredients/${item.strIngredient1}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de drink"
                />
                <p data-testid={ `${index}-card-name` }>{item.strIngredient1}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    } if (items.meals) {
      return (
        <div className="cards-wrapper">
          {items.meals.map((item, index) => (
            <Link key={ index } to={ `/${id}/${item.idMeal}` }>
              <div
                key={ index }
                className="item-card"
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${item.strIngredient}-Small.png` }
                  data-testid={ `${index}-card-img` }
                  alt="imagem de comida"
                />
                <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }
  }
  return <div>Loading ...</div>;
}

IngredientCards.propTypes = {
  id: PropTypes.string.isRequired,
};

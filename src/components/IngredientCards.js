import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAPI from '../hooks/useAPI';

import '../css/Cards.css';

export default function IngredientCards({ id }) {
  // const { setItems, filters } = useContext(RecipesContext);
  const items = useAPI(id, 'ingredientsList');
  console.log(items);

  if (items && items.drinks && id === 'bebidas') {
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
                alt="ingredient"
              />
              <p data-testid={ `${index}-card-name` }>{item.strIngredient1}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  if (items && items.meals && id === 'comidas') {
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
                alt="ingredient"
              />
              <p data-testid={ `${index}-card-name` }>{item.strIngredient}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return <div>Loading ...</div>;
}

IngredientCards.propTypes = {
  id: PropTypes.string.isRequired,
};

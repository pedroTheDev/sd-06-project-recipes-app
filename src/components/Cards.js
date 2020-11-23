import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import RecipesContext from '../context/Context';
import history from '../helpers/History';
import useSearch from '../hooks/useSearch';

import '../css/Cards.css';

export default function Cards({ id }) {
  const { items } = useContext(RecipesContext);
  const setFilters = useSearch();

  useEffect(() => {
    setFilters({
      searchText: '',
      searchType: 'name',
      category: id,
    });
  }, []);

  function handleRedirect() {
    if (items && items.meals) {
      if (items.meals.length === 1) {
        const itemId = items.meals[0].idMeal;
        history.push(`/${id}/${itemId}`);
      }
    } else if (items && items.drinks) {
      if (items.drinks.length === 1) {
        const itemId = items.drinks[0].idDrink;
        history.push(`/${id}/${itemId}`);
      }
    }
  }

  if (items) {
    handleRedirect();
    // {redirect ? <Redirect to={ `/${id}/${itemId}` } /> : null}
    if (items.drinks) {
      return (
        <div className="cards-wrapper">
          {items.drinks.map((item, index) => (
            <div
              key={ index }
              className="item-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ item.strDrinkThumb }
                data-testid={ `${index}-card-img` }
                alt="imagem de drink"
              />
              <p data-testid={ `${index}-card-name` }>{item.strDrink}</p>
            </div>
          ))}
        </div>
      );
    }
    if (items.meals) {
      return (
        <div className="cards-wrapper">
          {items.meals.map((item, index) => (
            <div
              key={ index }
              className="item-card"
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ item.strMealThumb }
                data-testid={ `${index}-card-img` }
                alt="imagem de comida"
              />
              <p data-testid={ `${index}-card-name` }>{item.strMeal}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  return (
    <div>Faça uma busca</div>
  );
}

Cards.propTypes = {
  id: PropTypes.string.isRequired,
};

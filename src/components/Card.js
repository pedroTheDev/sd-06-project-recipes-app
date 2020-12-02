import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import '../Style/Card.css';

function Card({ title }) {
  const { recipes, errorFromApi, clickedCategory } = useContext(RecipesAppContext);
  const ZERO = 0;
  const DOZE = 12;
  let recipeType = '';
  let setRoute = '';

  if (title === 'Comidas') {
    recipeType = 'Meal';
    setRoute = 'comidas';
  } else {
    recipeType = 'Drink';
    setRoute = 'bebidas';
  }

  if ((recipes.length === 1) && !clickedCategory) {
    const id = recipes[0][`id${recipeType}`];
    return <Redirect to={ `/${setRoute}/${id}` } />;
  }

  if (errorFromApi === true) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <span>Ops...</span>;
  }

  return (
    recipes.length > ZERO && recipes.slice(ZERO, DOZE).map((recipe, index) => (
      <div
        key={ recipe[`id${recipeType}`] }
        data-testid={ `${index}-recipe-card` }
        className="card"
      >
        <Link
          to={ `/${setRoute}/${recipe[`id${recipeType}`]}` }
          type="button"
        >
          <img
            src={ recipe[`str${recipeType}Thumb`] }
            alt={ recipe[`str${recipeType}`] }
            data-testid={ `${index}-card-img` }
            className="card-img-top"
          />
        </Link>
        <h5
          data-testid={ `${index}-card-name` }
          className="card-text"
        >
          { recipe[`str${recipeType}`] }
        </h5>
      </div>
    ))
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Card;

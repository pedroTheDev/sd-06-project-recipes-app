import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesAppContext';

function Foods() {
  const { recipes, errorFromApi } = useContext(RecipesContext);
  const ZERO = 0;
  const DOZE = 12;

  if (recipes.length === 1) {
    const id = recipes[0].idMeal;
    return <Redirect to={ `/comidas/${id}` } />;
  }

  if (errorFromApi === true) {
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <span>Ops...</span>;
  }

  const divStyle = {
    width: '10rem',
  };

  return (
    <>
      {recipes.slice(ZERO, DOZE).map((meal, index) => (
        <div
          key={ meal.idMeal }
          data-testid={ `${index}-recipe-card` }
          className="card"
          style={ divStyle }
        >
          <img
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            data-testid={ `${index}-card-img` }
            className="card-img-top"
          />
          <p
            data-testid={ `${index}-card-name` }
            className="card-text"
          >
            { meal.strMeal }
          </p>
        </div>))}
      {' '}
    </>
  );
}

export default Foods;

import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import RecipesContext from '../context/RecipesAppContext';

function Drinks() {
  const { recipes, errorFromApi } = useContext(RecipesContext);
  const ZERO = 0;
  const DOZE = 12;

  if (recipes.length === 1) {
    const id = recipes[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
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
      {recipes.slice(ZERO, DOZE).map((drink, index) => (
        <div
          key={ drink.idDrink }
          data-testid={ `${index}-recipe-card` }
          className="card"
          style={ divStyle }
        >
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
            className="card-img-top"
          />
          <p
            data-testid={ `${index}-card-name` }
            className="card-text"
          >
            { drink.strDrink }
          </p>
        </div>))}
      {' '}
    </>
  );
}

export default Drinks;

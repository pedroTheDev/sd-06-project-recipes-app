import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesAppContext';

function RecipeFoodDetails({ match }) {
  const { id } = match.params;
  const { recipes } = useContext(RecipesContext);

  if (recipes.length !== 0) {
    return (
      <div>
        <img data-testid="recipe-photo" src={ recipes[0].strMealThumb } alt="..." />
        <h4 data-testid="recipe-title">
          {' '}
          { recipes[0].strMeal }
          {' '}
        </h4>
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
        <p data-testid="recipe-category">{recipes[0].strCategory}</p>
        <p data-testid="instructions">{recipes[0].strInstructions}</p>
        <span data-testid="video">
          {' '}
          https://www.youtube.com/watch?v=1IszT_guI08
          {' '}
        </span>
        <div data-testid={ `${id}-recomendation-card` } />
        <button type="button" data-testid="start-recipe-btn">Iniciar Receita</button>

      </div>
    );
  }

  return <span>teste</span>;
}

export default RecipeFoodDetails;

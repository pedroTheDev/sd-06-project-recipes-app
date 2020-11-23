import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import '../css/details.css';

function DrinkDetail() {
  return (
    <div>
      <img data-testid="recipe-photo" src="" alt="" />
      <h1 data-testid="recipe-title">titulo api</h1>
      <button data-testid="share-btn" type="button">{shareIcon}</button>
      <button data-testid="favorite-btn" type="button">{whiteHeartIcon}</button>
      <h4 data-testid="recipe-category">texto categoria</h4>
      <p data-testid="0-ingredient-name-and-measure">lista de ingredientes</p>
      <p data-testid="instructions">texto das instruções</p>
      <span data-testid="0-recomendation-card">receitas recomendadas</span>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="button-position"
      >
        Iniciar Receita
      </button>
    </div>
  );
}

export default DrinkDetail;

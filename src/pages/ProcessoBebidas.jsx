import React from 'react';
import { Link } from 'react-router-dom';
import HeartIcon from '../images/blackHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
// import Context from '../context/Context';
// import Header from '../Components/Header';

export default function ProcessoBebidas() {
  return (
    <div>
      <h1>Processo Bebidas</h1>
      <img data-testid="recipe-photo" alt="foto-recipe" />
      <h2 data-testid="recipe-title">Titulo da Receita</h2>
      <button
        type="button"
        src={ ShareIcon }
        alt="compartilhar"
        data-testid="share-btn"
      >
        Compartilhar
      </button>
      <button
        type="button"
        src={ HeartIcon }
        alt="favoritar"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <h3 data-testid="recipe-category">Categoria da receita</h3>
      {/* <p data-testid={ `${index}-ingredient-stepIngredientes` }>Ingredientes</p> */}
      <p data-testid="instructions">Instruções</p>
      <Link to="/receitas-feitas">
        <button type="button" data-testid="finish-recipe-btn">Finalizar Receita</button>
      </Link>
    </div>
  );
}

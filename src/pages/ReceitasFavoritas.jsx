import React from 'react';
import Header from '../components/Header';
import { loadState } from '../services/localStorage';
import FavoriteHeart from '../components/FavoriteHeart';
import buttonShare from '../styles/images/shareIcon.svg';

function ReceitasFavoritas() {
  const copyBoard = (id, type) => {
    let url = '';
    if (type === 'comida') {
      url = `http://localhost:3000/comidas/${id}`;
    } else {
      url = `http://localhost:3000/bebidas/${id}`;
    }
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    // const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    // divBtns.appendChild(newSpan);
  };

  return (
    <div>
      <Header name="Receitas Favoritas" button={ false } />
      {loadState('favoriteRecipes', []).map(({
        id,
        type,
        area,
        category,
        alcoholicOrNot,
        name,
        image,
      }, index) => (
        <div
          data-testid={ `${index}-${name}-horizontal-tag` }
          key={ index }
        >
          <img
            src={ image }
            alt={ name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${area} - ${category}` }
          </p>
          <h2
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h2>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => copyBoard(id,type) }
          >
            <img src={ buttonShare } alt="img-button-share" />
          </button>
          <FavoriteHeart id={ id } />
        </div>
      ))}
    </div>
  );
}

export default ReceitasFavoritas;

import React, { useContext } from 'react';
import recipesAppContext from '../context/recipesAppContext';

function SecondaryHeader(id) {
  const { strName, strThumb, title, category } = useContext(recipesAppContext);
  return (
    <div className="header-container">
      <header>
        <img
          data-testid="recipe-photo"
          alt={ strName }
          src={ strThumb }
        />
        <h1 data-testid="recipe-title">{ title }</h1>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
        <p data-testid="recipe-category">{ category }</p>
      </header>
    </div>
  );
}

export default SecondaryHeader;

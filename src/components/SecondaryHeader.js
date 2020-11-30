import React, { useState } from 'react';
import copy from 'clipboard-copy';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { shareIcon, whiteHeartIcon, blackHeartIcon } from '../images';

function SecondaryHeader({ name, img, category }) {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShareIcon = () => {
    const url = `http://localhost:3000/comidas/${id}`;
    console.log('url', url);
    copy(url);
    const shareButton = document.querySelector('.share-btn');
    shareButton.value = 'Link copiado!';
    const paragraph = document.querySelector('.copied-link');
    const span = document.createElement('span');
    paragraph.appendChild(span);
    span.innerHTML = 'Link copiado!';
  };

  const handleFavoriteRecipe = () => {
    console.log('is favorite', 'teste');
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="header-container">
      <header>
        <img
          data-testid="recipe-photo"
          alt={ name }
          src={ img }
        />
        <h1 data-testid="recipe-title">{ name }</h1>
        <input
          type="image"
          data-testid="share-btn"
          className="share-btn"
          src={ shareIcon }
          alt="Share recipe"
          onClick={ handleShareIcon }
        />
        <p className="copied-link" />
        <input
          type="image"
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite recipe"
          onClick={ handleFavoriteRecipe }
        />
        <p data-testid="recipe-category">{ category }</p>
      </header>
    </div>
  );
}

SecondaryHeader.propTypes = {
  name: propTypes.string.isRequired,
  img: propTypes.string.isRequired,
  category: propTypes.string.isRequired,
};

export default SecondaryHeader;

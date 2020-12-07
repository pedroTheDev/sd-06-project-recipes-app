import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const favorites = (JSON.parse(localStorage.getItem('favoriteRecipes')) === null) ? [] : JSON.parse(localStorage.getItem('favoriteRecipes'));
  const alcoholic = favorites.map((e) => e.alcoholicOrNot);
  const [copied, setCopied] = useState(false);

  function handleRemove(index) {
    favorites.splice(index, 1);
    localStorage.removeItem('favoriteRecipes');
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    window.location.reload();
  }

  function handleShareClick(item) {
    clipboardCopy(`http://localhost:3000/comidas/${item}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  return (
    <div className="food-container">
      <Header title="Receitas Favoritas" />
      <div className="mobile-container">
        <div className="favorite-filters">
          <button
            type="button"
            data-testid="filter-by-all-btn"
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
          >
            Drinks
          </button>
        </div>
        {(favorites === []) && <h1>Você ainda não favoritou receitas!</h1>}
        <div className="fav-cards-container">
          {favorites.map((e, index) => (
            <div key={ index } className="fav-card">
              <Link to={ `/${e.type}s/${e.id}` }>
                <h4
                  className="fav-title"
                  data-testid={ `${index}-horizontal-name` }
                >
                  { `${e.name}`}
                </h4>
                <img
                  src={ e.image }
                  alt="foto"
                  className="fav-img"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>

              <p data-testid={ `${index}-horizontal-top-text` }>
                { `${e.area} - ${e.category}` }
                {alcoholic[index]}
              </p>

              <div className="action-btns-div">
                <button
                className="share-btn"
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => handleShareClick(e.id) }
                  src={ shareIcon }
                >
                  <img src={ shareIcon } alt="share" />
                  Compartilhar
                </button>
                {(copied) && <span className="copied-span">Link copiado!</span>}

                <button
                  className="fav-btn"
                  type="button"
                  onClick={ () => handleRemove(index) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                >
                  <img src={ blackHeartIcon } alt="blackHeart" />
                  Remover Favorito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

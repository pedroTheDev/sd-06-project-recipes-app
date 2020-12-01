import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipe] = useState('');

  // { id,
  //   type,
  //   image,
  //   alcoholicOrNot,
  //   name,
  //   area,
  //   category,
  //   doneDate,
  //   tags,
  // }

  useEffect(() => {
    const myFavoritesRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipe(myFavoritesRecipes);
  }, []);

  return (
    <div>
      <Header />
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

      <div>
        {favoriteRecipes && favoriteRecipes
          .map((item, index) => (
            <span
              key={ index }
            >
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              {
                (item.type === 'comida')
                  ? (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { `${item.area} - ${item.category}` }
                    </p>)
                  : (
                    <p data-testid={ `${index}-horizontal-top-text` }>
                      { item.alcoholicOrNot }
                    </p>)
              }
              <Link to={ `/${item.type}s/${item.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  { item.name }
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { item.doneDate }
              </p>
              <button
                data-testid="share-btn"
                type="button"
              >
                <img
                  src={ shareIcon }
                  alt="Compatilhar Receita"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </button>
              <button
                data-testid="favorite-btn"
                type="button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  alt="Botão de Favorito"
                />
              </button>
              {item.tags ? item.tags.map((tag) => (
                <p
                  key={ tag }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}
                </p>
              )) : '' }
            </span>
          )) }
      </div>

    </div>
  );
}

export default ReceitasFavoritas;
